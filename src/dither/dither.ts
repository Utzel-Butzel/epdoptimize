import palettes from "./data/default-palettes.json";
import diffusionMaps from "./data/diffusion-maps";
//import thresholdMaps from "./data/threshold-maps.json";

/* Functions */
import bayerMatrix from "./functions/bayer-matrix";
import colorHelpers from "./functions/color-helpers";
// import colorPaletteFromImage from "./functions/color-palette-from-image";
import utilities from "./functions/utilities";
import findClosestPaletteColor from "./functions/find-closest-palette-color";

const defaultOptions = {
  ditheringType: "errorDiffusion",

  errorDiffusionMatrix: "floydSteinberg",
  serpentine: false,

  orderedDitheringType: "bayer",
  orderedDitheringMatrix: [4, 4],

  randomDitheringType: "blackAndWhite",

  palette: "default",

  sampleColorsFromImage: false,
  numberOfSampleColors: 10,
};

const dither = async (sourceCanvas, canvas, opts) => {
  if (!sourceCanvas || !canvas) {
    return;
  }

  const ctx = sourceCanvas.getContext("2d");
  const image = ctx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);

  const options = { ...defaultOptions, ...opts };

  const width = image.width;
  let colorPalette = [];

  if (!options.palette || options.sampleColorsFromImage === true) {
    // colorPalette = colorPaletteFromImage(image, options.numberOfSampleColors);
  } else {
    colorPalette = setColorPalette(options.palette);
  }

  function setPixel(pixelIndex, pixel) {
    image.data[pixelIndex] = pixel[0];
    image.data[pixelIndex + 1] = pixel[1];
    image.data[pixelIndex + 2] = pixel[2];
    image.data[pixelIndex + 3] = pixel[3];
  }

  const thresholdMap = bayerMatrix([
    options.orderedDitheringMatrix[0],
    options.orderedDitheringMatrix[1],
  ]);

  let current, newPixel, quantError, oldPixel;

  for (current = 0; current <= image.data.length; current += 4) {
    const currentPixel = current;
    oldPixel = getPixelColorValues(currentPixel, image.data);

    if (
      !options.ditheringType ||
      options.ditheringType === "quantizationOnly"
    ) {
      newPixel = findClosestPaletteColor(oldPixel, colorPalette);
      setPixel(currentPixel, newPixel);
    }

    if (
      options.ditheringType === "random" &&
      options.randomDitheringType === "rgb"
    ) {
      newPixel = randomDitherPixelValue(oldPixel);
      setPixel(currentPixel, newPixel);
    }

    if (
      options.ditheringType === "random" &&
      options.randomDitheringType === "blackAndWhite"
    ) {
      newPixel = randomDitherBlackAndWhitePixelValue(oldPixel);
      setPixel(currentPixel, newPixel);
    }

    if (options.ditheringType === "ordered") {
      const orderedDitherThreshold = 256 / 4;
      newPixel = orderedDitherPixelValue(
        oldPixel,
        pixelXY(currentPixel / 4, width),
        thresholdMap,
        orderedDitherThreshold
      );
      newPixel = findClosestPaletteColor(newPixel, colorPalette);
      setPixel(currentPixel, newPixel);
    }

    const diffusionMap =
      diffusionMaps[options.errorDiffusionMatrix]() ||
      diffusionMaps["floydSteinberg"]();
    if (options.ditheringType === "errorDiffusion") {
      newPixel = findClosestPaletteColor(oldPixel, colorPalette);

      setPixel(currentPixel, newPixel);

      quantError = getQuantError(oldPixel, newPixel);

      diffusionMap.forEach((diffusion) => {
        const pixelOffset =
          diffusion.offset[0] * 4 + diffusion.offset[1] * 4 * width;
        const pixelIndex = currentPixel + pixelOffset;
        if (!image.data[pixelIndex]) {
          // Check if pixel exists e.g. on the edges
          return;
        }
        const errorPixel = addQuantError(
          getPixelColorValues(pixelIndex, image.data),
          quantError,
          diffusion.factor
        );
        setPixel(pixelIndex, errorPixel);
      });
    }
  }

  return imageDataToCanvas(image, canvas);
};

const getPixelColorValues = (pixelIndex, data) => {
  return [
    data[pixelIndex],
    data[pixelIndex + 1],
    data[pixelIndex + 2],
    data[pixelIndex + 3],
  ];
};

const getQuantError = (oldPixel, newPixel) => {
  //const maxValue = 255
  const quant = oldPixel.map((color, i) => {
    return color - newPixel[i];
  });

  return quant;
};

const addQuantError = (pixel, quantError, diffusionFactor) => {
  return pixel.map((color, i) => color + quantError[i] * diffusionFactor);
};

const randomDitherPixelValue = (pixel) => {
  return pixel.map((color) =>
    color < utilities.randomInteger(0, 255) ? 0 : 255
  );
};

const randomDitherBlackAndWhitePixelValue = (pixel) => {
  const averageRGB = (pixel[0] + pixel[1] + pixel[2]) / 3;
  return averageRGB < utilities.randomInteger(0, 255)
    ? [0, 0, 0, 255]
    : [255, 255, 255, 255];
};

const orderedDitherPixelValue = (
  pixel,
  coordinates,
  thresholdMap,
  threshold
) => {
  const factor =
    thresholdMap[coordinates[1] % thresholdMap.length][
      coordinates[0] % thresholdMap[0].length
    ] /
    (thresholdMap.length * thresholdMap[0].length);
  return pixel.map((color) => color + factor * threshold);
};

const pixelXY = (index, width) => {
  return [index % width, Math.floor(index / width)];
};

const setColorPalette = (palette) => {
  const paletteArray =
    typeof palette === "string" ? palettes[palette] : palette;
  return paletteArray.map((color) => colorHelpers.hexToRgb(color));
};

const imageDataToCanvas = (imageData, canvas) => {
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  const ctx = canvas.getContext("2d");

  ctx.putImageData(imageData, 0, 0);

  return canvas;
};

export default dither;

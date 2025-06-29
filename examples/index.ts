import {
  ditherImage,
  getDefaultPalettes,
  getDeviceColors,
  replaceColors,
} from "../src";

const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const inputCanvas = document.getElementById("inputCanvas") as HTMLCanvasElement;
const outputCanvas = document.getElementById(
  "outputCanvas"
) as HTMLCanvasElement;
const deviceColorsCanvas = document.getElementById(
  "deviceColorsCanvas"
) as HTMLCanvasElement;
const downloadLink = document.getElementById(
  "downloadLink"
) as HTMLAnchorElement;
const downloadDeviceColorsLink = document.getElementById(
  "downloadLink"
) as HTMLAnchorElement;

const paletteSelect = document.getElementById(
  "paletteSelect"
) as HTMLSelectElement;
const deviceColorsSelect = document.getElementById(
  "deviceColorsSelect"
) as HTMLSelectElement;

const ditheringTypeSelect = document.getElementById(
  "ditheringType"
) as HTMLSelectElement;
const errorDiffusionMatrixSelect = document.getElementById(
  "errorDiffusionMatrix"
) as HTMLSelectElement;
/* const serpentineCheckbox = document.getElementById(
  "serpentine"
) as HTMLInputElement; */
/* const orderedDitheringTypeSelect = document.getElementById(
  "orderedDitheringType"
) as HTMLSelectElement; */
const orderedDitheringMatrixW = document.getElementById(
  "orderedDitheringMatrixW"
) as HTMLInputElement;
const orderedDitheringMatrixH = document.getElementById(
  "orderedDitheringMatrixH"
) as HTMLInputElement;
const randomDitheringTypeSelect = document.getElementById(
  "randomDitheringType"
) as HTMLSelectElement;
/* 
const sampleColorsFromImageCheckbox = document.getElementById(
  "sampleColorsFromImage"
) as HTMLInputElement;
const numberOfSampleColorsInput = document.getElementById(
  "numberOfSampleColors"
) as HTMLInputElement; */

let lastImage: HTMLImageElement | null = null;

// Load default image on page load
window.addEventListener("DOMContentLoaded", async () => {
  const img = new Image();
  img.src = import.meta.env.BASE_URL + "example-dither.jpg";
  await img.decode();
  lastImage = img;
  await processImage();
});

function getDitherOptionsFromUI(palette: string[]) {
  const ditheringType = ditheringTypeSelect.value;
  const errorDiffusionMatrix = errorDiffusionMatrixSelect.value;
  // const serpentine = serpentineCheckbox.checked;
  // const orderedDitheringType = orderedDitheringTypeSelect.value;
  const orderedDitheringMatrix = [
    parseInt(orderedDitheringMatrixW.value, 10),
    parseInt(orderedDitheringMatrixH.value, 10),
  ];
  const randomDitheringType = randomDitheringTypeSelect.value;
  //const sampleColorsFromImage = sampleColorsFromImageCheckbox.checked;
  //const numberOfSampleColors = parseInt(numberOfSampleColorsInput.value, 10);

  return {
    ditheringType,
    errorDiffusionMatrix,
    //serpentine,
    //orderedDitheringType,
    orderedDitheringMatrix,
    randomDitheringType,
    palette,
    //sampleColorsFromImage,
    //numberOfSampleColors,
    calibrate: true,
  };
}

async function processImage() {
  if (!lastImage) return;
  inputCanvas.width = lastImage.width;
  inputCanvas.height = lastImage.height;
  const ctx = inputCanvas.getContext("2d")!;
  ctx.drawImage(lastImage, 0, 0);

  const paletteName = paletteSelect.value;
  const deviceColorsName = deviceColorsSelect.value;
  const palette = getDefaultPalettes(paletteName);
  const deviceColors = getDeviceColors(deviceColorsName);
  const options = getDitherOptionsFromUI(palette);

  const ditheredData = await ditherImage(inputCanvas, outputCanvas, options);
  downloadLink.href = outputCanvas.toDataURL("image/png");
  replaceColors(outputCanvas, deviceColorsCanvas, {
    originalColors: palette,
    replaceColors: deviceColors,
  });
  downloadDeviceColorsLink.href = deviceColorsCanvas.toDataURL("image/png");
}

fileInput.addEventListener("change", async () => {
  if (!fileInput.files?.length) return;
  const file = fileInput.files[0];
  const img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();
  lastImage = img;
  await processImage();
});

// Add event listeners to automatically update on input changes
[
  paletteSelect,
  deviceColorsSelect,
  ditheringTypeSelect,
  errorDiffusionMatrixSelect,
  orderedDitheringMatrixW,
  orderedDitheringMatrixH,
  randomDitheringTypeSelect,
].forEach((el) => {
  console.log("Adding change listener to", el);
  el.addEventListener("change", async () => {
    await processImage();
  });
  // For text inputs, also listen to 'input' events
  if (el instanceof HTMLInputElement) {
    el.addEventListener("input", async () => {
      await processImage();
    });
  }
});

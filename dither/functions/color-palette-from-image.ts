//const { createCanvas, Image } = require('canvas')
import utilities from "./utilities";

const distanceInColorSpace = async (color1, color2) => {
  // Currenlty ignores alpha

  const r = color1[0] - color2[0];
  const g = color1[1] - color2[1];
  const b = color1[2] - color2[2];

  const distance = Math.sqrt(r * r + g * g + b * b);
  return distance;
};

const colorPaletteFromImage = (image, numberOfColors) => {
  // First we create a canvas and downsize the image
  const sampleCanvasWidth = 300;
  const sampleCanvasHeight = (image.width / image.height) * sampleCanvasWidth;

  // let canvas = createCanvas(sampleCanvasWidth, sampleCanvasHeight);

  const canvas = document.createElement("canvas");
  canvas.width = sampleCanvasWidth;
  canvas.height = sampleCanvasHeight;

  const ctx = canvas.getContext("2d");
  ctx.putImageData(image, 0, 0, 0, 0, sampleCanvasWidth, sampleCanvasHeight);
  const downsizedImageData = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const colors = [];
  const imageData = downsizedImageData.data;
  for (
    let currentPixel = 0;
    currentPixel < downsizedImageData.data.length;
    currentPixel += 4
  ) {
    const color = [
      imageData[currentPixel],
      imageData[currentPixel + 1],
      imageData[currentPixel + 2],
    ];
    colors.push(color);
  }

  const palette = quantize(colors, numberOfColors);
  return palette;
};

const randomItemsFromArray = (array, n) => {
  const randomIndexes = [];
  while (randomIndexes.length < n) {
    const randomArrayIndex = utilities.randomInteger(0, array.length - 1);
    if (!randomIndexes.includes(randomArrayIndex)) {
      randomIndexes.push(randomArrayIndex);
    }
  }

  const itemsFromArray = randomIndexes.map((index) => array[index]);
  return itemsFromArray;
};

const quantize = (colors, k) => {
  if (k > colors) {
    throw Error(`K (${k}) is greater than colors (${colors.length}).`);
  }

  const centers = randomItemsFromArray(colors, k);
  let oldCentroids = centers.map((center) => {
    return {
      position: center,
      points: [],
    };
  });

  let newCentroids = [];
  const maxRounds = 300;
  let currentRound = 0;

  while (currentRound < maxRounds) {
    const centroidsWithPoints = assignPixelsToCentroids(colors, oldCentroids);
    newCentroids = moveCentroidsToAveragePosition(centroidsWithPoints);
    if (centroidsMatch(oldCentroids, newCentroids)) {
      break;
    }
    oldCentroids = newCentroids;
    currentRound++;
  }

  const colorPalette = newCentroids.map((centroid) => centroid.position);
  return colorPalette;
};

const centroidsMatch = (oldCentroids, newCentroids) => {
  if (oldCentroids.length !== newCentroids.length) {
    return false;
  }

  const oldC = oldCentroids.map((centroid) => centroid.position).flat();
  const newC = newCentroids.map((centroid) => centroid.position).flat();

  let matching = true;

  oldC.forEach((c, i) => {
    if (c !== newC[i]) {
      matching = false;
    }
  });

  return matching;
};

const assignPixelsToCentroids = (colors, centroids) => {
  colors.forEach((color) => {
    let nearestCentroidIndex = null;
    let nearestCentroidDistance = null;
    centroids.forEach((centroid, i) => {
      const distance = distanceInColorSpace(centroid.position, color);
      if (
        nearestCentroidIndex === null ||
        nearestCentroidDistance === null ||
        distance < nearestCentroidDistance
      ) {
        nearestCentroidIndex = i;
        nearestCentroidDistance = distance;
      }
    });
    centroids[nearestCentroidIndex].points.push(color);
  });

  return centroids;
};

const moveCentroidsToAveragePosition = (centroids) => {
  const averageCentroids = [];
  centroids.forEach((centroid) => {
    const numberOfPoints = centroid.points.length;
    if (numberOfPoints > 0) {
      const sumOfAllPoints = [0, 0, 0];
      centroid.points.forEach((point) => {
        sumOfAllPoints[0] += point[0];
        sumOfAllPoints[1] += point[1];
        sumOfAllPoints[2] += point[2];
      });
      const averageOfAllPoints = [
        Math.round(sumOfAllPoints[0] / numberOfPoints),
        Math.round(sumOfAllPoints[1] / numberOfPoints),
        Math.round(sumOfAllPoints[2] / numberOfPoints),
      ];
      averageCentroids.push({ position: averageOfAllPoints, points: [] });
    } else {
      averageCentroids.push({ position: centroid.position, points: [] });
    }
  });
  return averageCentroids;
};

export default colorPaletteFromImage;

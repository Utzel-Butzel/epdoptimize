const hex = (h) => {
  return h
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (_, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));
};

export const replaceColors = (
  fromCanvas,
  destCanvas,
  { originalColors, replaceColors }
) => {
  const fromCtx = fromCanvas.getContext("2d");
  const width = fromCanvas.width;
  const height = fromCanvas.height;

  const destCtx = destCanvas.getContext("2d");

  const imageData = fromCtx.getImageData(0, 0, width, height);
  var errorColors = 0;

  const originalColorsRgb = originalColors.map((color) => hex(color));
  const replaceColorsRgb = replaceColors.map((color) => hex(color));

  for (let i = 0; i < imageData.data.length; i += 4) {
    // Check if the pixel color matches any of the original colors
    const colorRgb = originalColorsRgb.find((color) => {
      return (
        imageData.data[i] == color[0] &&
        imageData.data[i + 1] == color[1] &&
        imageData.data[i + 2] == color[2]
      );
    });

    if (colorRgb) {
      // Find the index of the matched color in the original colors array
      const index = originalColorsRgb.indexOf(colorRgb);
      // Get the corresponding color from the replaceColors array
      const colorMapRgb = replaceColorsRgb[index];
      if (!colorMapRgb) {
        return;
      }
      imageData.data[i] = colorMapRgb[0];
      imageData.data[i + 1] = colorMapRgb[1];
      imageData.data[i + 2] = colorMapRgb[2];
    } else {
      errorColors++;
    }
  }
  //});
  if (errorColors > 0) {
    console.warn(
      `replaceColors: ${errorColors} pixels were not replaced. Check if the colors match exactly.`
    );
  }
  // Set size of destination canvas
  destCanvas.width = width;
  destCanvas.height = height;
  destCtx.putImageData(imageData, 0, 0);
};

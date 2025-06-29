const findClosestPaletteColor = (pixel, colorPalette) => {
  const colors = colorPalette.map((color) => {
    return {
      distance: distanceInColorSpace(color, pixel),
      color,
    };
  });

  let closestColor;
  colors.forEach((color) => {
    if (!closestColor) {
      closestColor = color;
    } else {
      if (color.distance < closestColor.distance) {
        closestColor = color;
      }
    }
  });

  if (!closestColor.color[3]) {
    closestColor.color.push(255); // if no alpha value is present add it.
  }

  return closestColor.color;
};

const distanceInColorSpace = (color1, color2) => {
  // Currenlty ignores alpha

  // Luminosity needs to be accounted for, for better results.
  // var lumR = .2126,
  //     lumG = .7152,
  //     lumB = .0722

  // const max = 255

  // const averageMax = Math.sqrt(lumR * max * max + lumG * max * max + lumB * max * max) // I Dont understand this

  const r = color1[0] - color2[0];
  const g = color1[1] - color2[1];
  const b = color1[2] - color2[2];

  const distance = Math.sqrt(r * r + g * g + b * b);
  return distance;
};

export default findClosestPaletteColor;

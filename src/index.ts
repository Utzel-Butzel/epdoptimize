import palettes from "../dither/data/default-palettes.json";

/**
 * Retrieve a named default palette (hex codes).
 * Unknown names fall back to the 'default' palette.
 */
export function getDefaultPalettes(name: string): string[] {
  const key = name.toLowerCase();
  return (palettes as Record<string, string[]>)[key] || palettes.default;
}

// Retrieve device-specific color codes (hex).
export function getDeviceColors(name: string): string[] {
  const key = name.toLowerCase();
  const deviceColors: Record<string, string[]> = {
    "spectra 6": [
      "#000", // black
      "#fff", // white
      "#0000FF", // blue
      "#00FF00", // green
      "#FF0000", // red
      "#FF8000", // orange
      "#FFFF00", // yellow
    ],
    acep: [
      "#000", // black
      "#fff", // white
      "#FF0000", // red
      "#00FF00", // green
      "#0000FF", // blue
      "#808080", // gray
      "#FFFF00", // yellow
    ],
  };
  // Return matching palette or default to Spectra 6
  return deviceColors[key] || deviceColors["spectra 6"];
}

// Re-export core dither function under the public API
export { default as ditherImage } from "../dither/dither";

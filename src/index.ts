import palettes from "./dither/data/default-palettes.json";
import deviceColors from "./dither/data/default-device-colors.json";

/**
 * Retrieve a named default palette (hex codes).
 * This is used for dithering images to fit the eInk display and uses the real colors of the display.
 */
export function getDefaultPalettes(name: string): string[] {
  const key = name.toLowerCase();
  return (palettes as Record<string, string[]>)[key] || palettes.default;
}
/**
 * Retrieve a named default device color set that is used for displaying the colors on the eInk display.
 */
export function getDeviceColors(name: string): string[] {
  const key = name.toLowerCase();
  return (
    (deviceColors as Record<string, string[]>)[key] || deviceColors.default
  );
}

export { replaceColors } from "./replaceColors/replaceColors";

export { default as ditherImage } from "./dither/dither";

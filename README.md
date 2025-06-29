# EDP Optimize

A JavaScript library for reducing image colors and dithering them to fit (color) eInk displays with optimal visual quality.

## Supported Displays

- **AcEP**
- **Spectra 6**

## Features

- **Dithering Algorithms:** Multiple high-quality dithering options to improve color blending and gradients.
- **Color Calibration:** Match device-specific color characteristics for more accurate results.

## Installation

```bash
npm install epdoptimize
# or
yarn add epdoptimize
```

## Usage Example

```js
import { ditherImage, getDefaultPalettes, getDeviceColors } from 'epdoptimize';

const image = /* your image data */;
const palette = getDefaultPalettes('Spectra 6');
const spectra6colors = getDeviceColors('Spectra 6'); // Spectra 6 color set
const acepColors = getDeviceColors('AcEP'); // AcEP color set

const options = {
  algorithm: 'floydSteinberg',
  palette,
  calibrate: true,
};
const dithered = ditherImage(image, options);

const prepared = prepareImage(dithered, {
    from: palette,
    to: spectra6colors
});
// Use dithered image data for your eInk display
```

## How It Works

### Color Calibration

eInk displays often render colors less vibrantly than their digital values suggest (e.g., a device red like `#dddd` may appear duller in reality). By calibrating with real-world color measurements, the library ensures that dithering and color reduction use the actual appearance of colors on your target display. After processing, you can map the calibrated colors back to the device's required values.

### Dithering Algorithms

Dithering helps create the illusion of intermediate colors by distributing quantization errors across neighboring pixels. This is especially important for eInk displays with limited color palettes.

#### Available Diffusion Algorithms

- **floydSteinberg:**
  - The classic Floyd-Steinberg error diffusion algorithm. Distributes quantization error to four neighboring pixels. Produces visually pleasing results and is widely used.
- **falseFloydSteinberg:**
  - A simplified version of Floyd-Steinberg. Distributes error to only three neighbors, making it faster but with slightly different dithering characteristics.
- **jarvis:**
  - Jarvis, Judice, and Ninke dithering. Spreads error over a wider area (three rows), resulting in smoother gradients but more blurring.
- **stucki:**
  - Stucki dithering. Similar to Jarvis but with different weights, offering a balance between smoothness and sharpness.
- **burkes:**
  - Burkes dithering. A simplified version of Stucki, using fewer neighbors and less computation, but still producing good results.
- **sierra3:**
  - Sierra-3 (original Sierra) dithering. Distributes error over three rows and is known for producing high-quality results with less blurring than Jarvis.
- **sierra2:**
  - Sierra-2 dithering. A reduced version of Sierra-3, using fewer neighbors for faster computation and less diffusion.
- **sierra2-4a:**
  - Sierra-2-4A dithering. A very lightweight and fast algorithm, distributing error to only three neighbors, suitable for speed-critical applications.

## Resources

- [paperlesspaper](https://paperlesspaper.de)

---

_Contributions and feedback are welcome!_

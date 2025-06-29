import { ditherImage, getDefaultPalettes } from "epdoptimize";

const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const inputCanvas = document.getElementById("inputCanvas") as HTMLCanvasElement;
const outputCanvas = document.getElementById(
  "outputCanvas"
) as HTMLCanvasElement;
const downloadLink = document.getElementById(
  "downloadLink"
) as HTMLAnchorElement;

fileInput.addEventListener("change", async () => {
  if (!fileInput.files?.length) return;
  const file = fileInput.files[0];
  const img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();

  inputCanvas.width = img.width;
  inputCanvas.height = img.height;
  const ctx = inputCanvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, img.width, img.height);
  const palette = getDefaultPalettes("Spectra 6");
  const options = { algorithm: "floydSteinberg", palette, calibrate: true };
  const ditheredData = ditherImage(imageData, options);

  outputCanvas.width = img.width;
  outputCanvas.height = img.height;
  const outCtx = outputCanvas.getContext("2d")!;
  outCtx.putImageData(ditheredData, 0, 0);

  downloadLink.href = outputCanvas.toDataURL("image/png");
});

// Copy example-dither.jpg to dist/examples/assets/
const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "examples/example-dither.jpg");
const destDir = path.resolve(__dirname, "dist/examples/assets");
const dest = path.join(destDir, "example-dither.jpg");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}
fs.copyFileSync(src, dest);
console.log("Copied example-dither.jpg to dist/examples/assets/");

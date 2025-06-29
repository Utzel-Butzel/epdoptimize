export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const utilities = { randomInteger };

export default utilities;

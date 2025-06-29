const createBayerMatrix = (size /* [X, Y] */) => {
  const width = size[0] < 8 ? size[0] : 8;
  const height = size[1] < 8 ? size[1] : 8;

  const bigMatrix = [
    [0, 48, 12, 60, 3, 51, 15, 63],
    [32, 16, 44, 28, 35, 19, 47, 31],
    [8, 56, 4, 52, 11, 59, 7, 55],
    [40, 24, 36, 20, 43, 27, 39, 32],
    [2, 50, 14, 62, 1, 49, 13, 61],
    [34, 18, 46, 30, 33, 17, 45, 29],
    [10, 58, 6, 54, 9, 57, 5, 53],
    [42, 26, 38, 22, 41, 25, 37, 21],
  ];

  if (width === 8 && height === 8) {
    // If we're using an 8 by 8 matrix just return the big matrix
    return bigMatrix;
  }

  const matrix = [];
  let currentY = 0;
  for (currentY; currentY < height; currentY++) {
    matrix.push([]);
  }

  matrix.forEach((row, y) => {
    let x = 0;
    for (x; x < width; x++) {
      row.push(bigMatrix[x][y]);
    }
  });

  const index = {};

  matrix
    .flat()
    .sort((a, b) => a - b)
    .forEach((n, i) => (index[n] = i));

  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      matrix[y][x] = index[cell];
    });
  });

  // function getPsuedoToroidalDistance (node1, node2 /* [x, y] */) {
  //     const xDistance = Math.abs(node1[0] - node2[0])
  //     const yDistance = Math.abs(node1[1] - node2[1])
  //     return Math.min(xDistance, width - xDistance) + Math.min(yDistance, height - yDistance)
  // }

  // function findBestUnfilledSlot (previousNode, previousNode2) {
  //     let bestDistance = 0
  //     let bestSlot = null
  //     matrix.forEach((row, y) => {
  //         row.forEach((cell, x) => {
  //             if (cell === null) {
  //                 let distance1 = getPsuedoToroidalDistance(previousNode, [x, y])
  //                 let distance2 = previousNode2 ? getPsuedoToroidalDistance(previousNode2, [x, y]) : 1
  //                 let distance = (distance1 * distance2)
  //                 if (distance > bestDistance) {
  //                     bestDistance = distance
  //                     bestSlot = [x, y]
  //                 }
  //             }
  //         })
  //     })
  //     return bestSlot
  // }

  // let previous = null
  // let previous2 = null
  // let currentNumber = 0
  // for (currentNumber; currentNumber < numberOfNodes; currentNumber++) {
  //     let cellXY = [[currentNumber % width], [currentNumber % height]]
  //     if (currentNumber === 0) {
  //         matrix[cellXY[1]][cellXY[0]] = 0
  //         previous = cellXY
  //     } else {
  //         let bestSlot = findBestUnfilledSlot(previous, previous2)
  //         matrix[bestSlot[1]][bestSlot[0]] = currentNumber
  //         previous2 = previous
  //         previous = [bestSlot[0], bestSlot[1]]
  //     }
  // }

  return matrix;
};

export default createBayerMatrix;

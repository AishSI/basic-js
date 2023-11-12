const { NotImplementedError } = require("../extensions/index.js");

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */

function minesweeper(matrix) {
  const matrixSize = {
    RowCount: matrix.length,
    ColumnCount: matrix[0].length,
  };
  const matrixWeightCell = Array.from(
    new Array(matrixSize.RowCount),
    () => new Array(matrixSize.ColumnCount)
  );

  matrix.forEach((row, indexRow) => {
    row.forEach((cell, indexColumn) => {
      matrixWeightCell[indexRow][indexColumn] = calcNear(
        indexRow,
        indexColumn,
        matrix,
        matrixSize
      );
    });
  });
  return matrixWeightCell;
}

function calcNear(row, col, matrix, size) {
  let res = 0;
  for (let offsetRow = -1; offsetRow <= 1; offsetRow += 1) {
    for (let offsetCol = -1; offsetCol <= 1; offsetCol += 1) {
      if (
        outBounds(offsetRow + row, offsetCol + col, size) ||
        (offsetRow === 0 && offsetCol === 0)
      )
        continue;
      let currCell = matrix[offsetRow + row][offsetCol + col];
      res += currCell ? 1 : 0;
    }
  }
  return res;
}

function outBounds(y, x, size) {
  return y < 0 || x < 0 || y >= size.RowCount || x >= size.ColumnCount;
}

module.exports = {
  minesweeper,
};

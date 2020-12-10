const fs = require('fs')

const grid = fs
  .readFileSync('./input/day3.txt', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((line) => line.split(''))

const rowLength = grid.length
const colLength = grid[0].length
const count = countTrees(3, 1)

console.log('count: ', count)
console.log(countTrees(1, 1) * countTrees(3, 1) * countTrees(5, 1) * countTrees(7, 1) * countTrees(1, 2))

function countTrees(deltaX, deltaY) {
  let curX = 0

  const count = grid.reduce((sum, curRow, index) => {
    // skipping multiple rows or skipping the very first row
    if (index % deltaY !== 0 || index === 0) {
      return sum
    }

    curX = (curX + deltaX) % colLength
    const hitTree = curRow[curX] === '#'

    return hitTree ? sum + 1 : sum
  }, 0)

  return count
}

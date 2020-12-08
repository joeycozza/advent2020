const _ = require('lodash')
const fs = require('fs')

const binary = [1, 2, 4, 8, 16, 32, 64]

const charOn = (char) => char === 'B' || char === 'R'

const countBinary = (str) => {
  return str.split('').reduce((sum, char, index) => {
    sum += charOn(char) ? binary[str.length - (index + 1)] : 0
    return sum
  }, 0)
}

let ids = fs
  .readFileSync('./input/day5.txt', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((seatString) => {
    const rowInfo = seatString.slice(0, 7)
    const colInfo = seatString.slice(-3)
    return countBinary(rowInfo) * 8 + countBinary(colInfo)
  })

console.log(findMissingNum(ids))

function findMissingNum(array) {
  array = array.sort((a, b) => a - b)
  const min = array[0]
  const max = array[array.length - 1]
  const range = _.range(min, max + 1)
  return [...range, ...array].reduce((xor, num) => xor ^ num, 0)
}

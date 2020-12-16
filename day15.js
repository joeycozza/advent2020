const _ = require('lodash')
const fs = require('fs')

let numbers = fs
  .readFileSync('./input/day15.txt', 'utf8')
  .slice(0, -1)
  .split(',')
  .map(Number)

console.log('numbers: ', numbers)

saySequence(numbers, 2020)

function saySequence(numList, count) {
  while (numList.length < count) {
    // numList.length - 2 because we want to find the second to last time, not the last time it was said
    const prevTimeSaid = numList.lastIndexOf(_.last(numList), numList.length - 2)

    const newNum = prevTimeSaid === -1 ? 0 : numList.length - 1 - prevTimeSaid

    numList.push(newNum)
  }

  console.log('Last Number: ', _.last(numList))
}

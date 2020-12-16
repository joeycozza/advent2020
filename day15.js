const _ = require('lodash')
const fs = require('fs')

const numberLastSeen = {}

let numbers = fs
  .readFileSync('./input/day15.txt', 'utf8')
  .slice(0, -1)
  .split(',')
  .map(Number)

prePopulateLastSeenMap(numbers)

saySequence(0, 30000000)

function saySequence(lastNum, count) {
  for (let i = numbers.length; i < count - 1; i++) {
    if(!numberLastSeen[lastNum]) {
      numberLastSeen[lastNum] = {}
      numberLastSeen[lastNum].penultimateSeenIndex = 0
      numberLastSeen[lastNum].lastSeenIndex = i
      lastNum = 0
    } else {
      numberLastSeen[lastNum].penultimateSeenIndex = numberLastSeen[lastNum].lastSeenIndex
      numberLastSeen[lastNum].lastSeenIndex = i
      lastNum = numberLastSeen[lastNum].lastSeenIndex - numberLastSeen[lastNum].penultimateSeenIndex
    }

  }
  console.log('lastNum: ', lastNum)
}

function prePopulateLastSeenMap(numbers) {
  numbers.forEach((num, index) => {
    numberLastSeen[num] = { lastSeenIndex: index, penultimateSeenIndex: 0 }
  })
}

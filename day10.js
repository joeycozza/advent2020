const _ = require('lodash')
const fs = require('fs')

const differences = fs
  .readFileSync('./input/day10.txt', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map(Number)
  .sort((a, b) => a - b)
  .map((num, index, array) => {
    return num - (array[index - 1] || 0)
  })

differences.push(3)

const countedBy = _.countBy(differences)
console.log('countedBy: ', countedBy)
const answer = countedBy['1'] * countedBy['3']
console.log('answer: ', answer)

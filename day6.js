const _ = require('lodash')
const fs = require('fs')

const length = (str) => str.length
const removeNewlines = (str) => str.replace(/\n/g, '')
const splitByString = (splitter) => (str) => str.split(splitter)
const intersectionSpread = (arr) => _.intersection(...arr)

const groups = fs.readFileSync('./input/day6.txt', 'utf8').split('\n\n')

const groupCounts = groups
  .map(removeNewlines)
  .map(_.uniq)
  .map(length)

const allYes = groups
  .map(splitByString('\n'))
  .map((group) => group.filter(Boolean).map(splitByString('')))
  .map(intersectionSpread)
  .map(length)

console.log('Anyone said yes count: ', _.sum(groupCounts))
console.log('Everyone said yes count: ', _.sum(allYes))

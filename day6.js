const _ = require('lodash')
const fs = require('fs')

const length = (str) => str.length
const removeNewlines = (str) => str.replace(/\n/g, '')
const splitByPerson = (str) => str.split('\n')

const groups = fs
  .readFileSync('./input/day6.txt', 'utf8')
  .split('\n\n')

const groupCounts = groups
  .map(removeNewlines)
  .map(_.uniq)
  .map(length)

const allYes = groups
  .map(splitByPerson)
  .map((group) => {
    const answerArrays = group.filter(Boolean).map((person) => person.split(''))
    return _.intersection(...answerArrays)
  })
  .map(length)

console.log('Anyone said yes count: ', _.sum(groupCounts))
console.log('Everyone said yes count: ', _.sum(allYes))

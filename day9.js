const _ = require('lodash')
const fs = require('fs')

const nums = fs
  .readFileSync('./input/day9.txt', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map(Number)

const firstBad = findFirstBadNumber(nums, 25)
console.log('firstBad: ', firstBad)
const contiguousNums = findContiguousSum(nums, firstBad)
console.log('contiguousNums: ', contiguousNums)
const answer = _.min(contiguousNums) + _.max(contiguousNums)
console.log('answer: ', answer)

function findContiguousSum(nums, goalSum) {
  for (let i = 0; i < nums.length; i++) {
    let length = 0
    let sum

    do {
      length++
      const contiguousNums = nums.slice(i, i+length)
      sum = _.sum(contiguousNums)
      if (sum === goalSum) {
        return contiguousNums
      }
    } while (sum < goalSum)
  }
}

function findFirstBadNumber(nums, preambleSize) {
  for (let position = preambleSize; position < nums.length; position++) {
    const curNum = nums[position]
    const prevNums = nums.slice(position - preambleSize, position)
    if (!hasPairingSum(prevNums, curNum)) {
      return curNum
    }
  }
}

function hasPairingSum(subArray, num) {
  const [a, b] = subArray.filter((a, aIndex, arr) => {
    return subArray.some((b, bIndex) => {
      return a + b === num && aIndex !== bIndex
    })
  })
  return !!a && !!b
}

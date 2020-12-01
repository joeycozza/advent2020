const fs = require('fs')

const nums = fs
  .readFileSync('./input/day1.txt', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map(Number)

const [a, b, c] = nums.filter((a, aIndex, arr) => {
  return nums.some((b, bIndex) => {
    return nums.some((c, cIndex) => {
      return a + b + c === 2020 && aIndex !== bIndex && aIndex !== cIndex
    })
  })
})

console.log('a,b,c: ', a, b, c)
console.log('a+b+c: ', a + b + c)
console.log('a*b*c: ', a * b * c)

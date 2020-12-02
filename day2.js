const fs = require('fs')

const passwords = fs
  .readFileSync('./input/day2.txt', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((a) => a.split(':'))

const countGood = passwords.reduce((sum, [rule, password]) => {
  const { min, max, char } = splitRuleInfo(rule)
  const occurences = password.split(char).length - 1
  return occurences >= min && occurences <= max ? sum + 1 : sum
}, 0)

const positionGood = passwords.reduce((sum, [rule, password]) => {
  const { min, max, char } = splitRuleInfo(rule)
  return (password[min] === char) ^ (password[max] === char) ? sum + 1 : sum
}, 0)

function splitRuleInfo(rule) {
  const [count, char] = rule.split(' ')
  const [min, max] = count.split('-').map(Number)
  return { min, max, char }
}

console.log('countGood: ', countGood)
console.log('positionGood: ', positionGood)

const _ = require('lodash')
const fs = require('fs')

const numberLastSeen = {}

let [rules, [, myTicket], nearbyTickets] = fs
  .readFileSync('./input/day16.txt', 'utf8')
  .split('\n\n')
  .map((str) => str.split('\n'))

rules = rules.map((ruleStr) => {
  const values = ruleStr.split(': ')[1].split(' or ')
  return values
})

myTicket = myTicket.split(',').map(Number)

nearbyTickets.shift()
nearbyTickets = nearbyTickets.filter(Boolean).map((ticket) => ticket.split(',').map(Number))

const badNums = nearbyTickets.reduce((badNums, ticket) => {
  const badNum = ticket.find((num) => {

    const numHasNoInvalidRules = rules.some(([range1, range2]) => {
      const range1Valid = isValid(range1, num)
      const range2Valid = isValid(range2, num)
      return isValid(range1, num) || isValid(range2, num)
    })

    return !numHasNoInvalidRules
  })

  if (badNum) {
    badNums.push(badNum)
  }

  return badNums
}, [])

console.log('badNums: ', badNums)
console.log('_.sum(badNums): ', _.sum(badNums))

function isValid(range, value) {
  const [min, max] = range.split('-').map(Number)
  return value >= min && value <= max
}

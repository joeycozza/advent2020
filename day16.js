const _ = require('lodash')
const fs = require('fs')

const numberLastSeen = {}

let [ruleInfo, [, myTicket], nearbyTickets] = fs
  .readFileSync('./input/day16.txt', 'utf8')
  .split('\n\n')
  .map((str) => str.split('\n'))

ruleInfo = ruleInfo.reduce((ruleObj, ruleStr) => {
  const [name, values] = ruleStr.split(': ')
  ruleObj[name] = values.split(' or ')
  return ruleObj
}, {})

myTicket = myTicket.split(',').map(Number)

nearbyTickets.shift()
nearbyTickets = nearbyTickets.filter(Boolean).map((ticket) => ticket.split(',').map(Number))

const validTickets = nearbyTickets.filter((ticket) => {
  const badNum = ticket.find((num) => {
    const numHasNoInvalidRules = Object.values(ruleInfo).some(([range1, range2]) => {
      const range1Valid = isValid(range1, num)
      const range2Valid = isValid(range2, num)
      return range1Valid || range2Valid
    })

    return !numHasNoInvalidRules
  })

  return !badNum
})

let positionValidRules = {}

for (let i = 0; i < validTickets[0].length; i++) {
  const samePositions = validTickets.map((ticket) => ticket[i])

  Object.entries(ruleInfo).forEach(([name, [range1, range2]]) => {
    const ruleValidForPosition = samePositions.every((num) => {
      const range1Valid = isValid(range1, num)
      const range2Valid = isValid(range2, num)
      return range1Valid || range2Valid
    })

    if (ruleValidForPosition) {
      positionValidRules[i] = positionValidRules[i] || []
      positionValidRules[i].push(name)
    }
  })
}

for (let i = 0; i < 20; i++) {
  positionValidRules = cleanupPositionRules(positionValidRules)
}

positionValidRules = _.pickBy(positionValidRules, ([value], key) => {
  return value.startsWith('departure')
})

const indicesToMultiply = Object.keys(positionValidRules)

const num = indicesToMultiply.reduce((num, curIndex) => {
  num *= myTicket[curIndex]
  return num
}, 1)

console.log('num: ', num)

function isValid(range, value) {
  const [min, max] = range.split('-').map(Number)
  return value >= min && value <= max
}

function positionsGuaranteed(positionValidRules) {
  return Object.values(positionValidRules).every((positionRules) => positionRules.length === 1)
}

function cleanupPositionRules(positionValidRules) {
  const definitePositions = _.flatten(Object.values(positionValidRules).filter((a) => a.length === 1))

  _.forEach(positionValidRules, (value, key) => {
    if (value.length > 1) {
      positionValidRules[key] = value.filter((ruleName) => !definitePositions.includes(ruleName))
    }
  })
  return positionValidRules
}

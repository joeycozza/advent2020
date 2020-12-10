const fs = require('fs')

const requiredFields = {
  byr: (str) => str && str.length === 4 && +str >= 1920 && +str <= 2002,
  iyr: (str) => str && str.length === 4 && +str >= 2010 && +str <= 2020,
  eyr: (str) => str && str.length === 4 && +str >= 2020 && +str <= 2030,
  hgt: (str) => {
    if (!str) {
      return false
    }
    const isCm = str.endsWith('cm')
    const isIn = str.endsWith('in')
    const validUnit = isCm || isIn
    if (!validUnit) {
      return false
    }
    const value = +str.slice(0, -2)

    if (isCm) {
      return value >= 150 && value <= 193
    } else {
      return value >= 59 && value <= 76
    }
  },
  hcl: (str) => str && /#[0-9a-f]{6}/.test(str),
  ecl: (str) => str && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(str),
  pid: (str) => str && /^\d{9}$/.test(str),
}

const validPassports = fs
  .readFileSync('./input/day4.txt', 'utf8')
  .split('\n\n')
  .map((rawPassportString) =>
    rawPassportString
      .replace(/\n/g, ' ')
      .split(' ')
      .filter(Boolean)
      .reduce((obj, entry) => {
        obj[entry.split(':')[0]] = entry.split(':')[1]
        return obj
      }, {})
  )
  .filter((passport) => Object.entries(requiredFields).every(([field, validator]) => validator(passport[field])))

console.log('passports.length: ', validPassports.length)
// console.log('validPassports: ', validPassports)

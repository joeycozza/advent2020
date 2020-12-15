const _ = require('lodash')
const fs = require('fs')

const BIT_LENGTH = 36
const memoryValues = {}
let mask

let instructions = fs
  .readFileSync('./input/day14.txt', 'utf8')
  .split('\n')
  .filter(Boolean)

// const [, mask] = maskInfo.split(' = ')
//
instructions.forEach(instruction => {
  const [command, value] = instruction.split(' = ')
  if (instruction.startsWith('mask')) {
    mask = value
  } else {
    const address = command.split('[')[1].slice(0, -1)
    memoryValues[address] = bin2dec(applyMask(toBinary(value)))
  }
})

console.log('_.sum(Object.values(memoryValues): ', _.sum(Object.values(memoryValues)))

function bin2dec(bin) {
  return parseInt(bin, 2)
}

function toBinary(integer) {
  let str = (+integer).toString(2)
  return str.padStart(BIT_LENGTH, '0')
}

function applyMask(bin) {
  mask.split('').forEach((char, index) => {
    if (char !== 'X') {
      bin = bin.substring(0, index) + char + bin.substring(index + 1)
    }
  })

  return bin
}

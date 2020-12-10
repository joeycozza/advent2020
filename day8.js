const _ = require('lodash')
const fs = require('fs')

const tape = fs
  .readFileSync('./input/day8.txt', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((instruction) => {
    const [operation, argument] = instruction.split(' ')
    return { operation, argument, callCount: 0 }
  })

findTweakedInstruction(tape)
function findTweakedInstruction(tape) {
  for (let i = 0; i < tape.length; i++) {
    const { operation, argument } = tape[i]
    console.log('operation: ', operation)
    if (operation === 'acc') {
      continue
    }

    const clonedTape = _.cloneDeep(tape)
    clonedTape[i].operation = operation === 'nop' ? 'jmp' : 'nop'

    const value = execute(clonedTape)
    if (value) {
      console.log(`We finished normal by tweaking operation #${i} - ${operation} ${argument}`)
      console.log('value: ', value)
      break
    }
  }
}

function execute(tape, position = 0, accumulator = 0) {
  if (position === tape.length) {
    console.log('We did it! Normal Execution finished')
    return accumulator
  }

  const instruction = tape[position]
  if (instruction.callCount === 1) {
    // console.log(`Calling a repeated instruction on position ${position}`)
    // console.log('accumulator: ', accumulator)
    return false
  }

  instruction.callCount++

  const { operation, argument } = instruction

  switch (operation) {
    case 'nop':
      position++
      break
    case 'acc':
      accumulator = sum(accumulator, argument)
      position++
      break
    case 'jmp':
      position = sum(position, argument)
      break
    default:
      console.log(`Operation ${operation} not supported`)
      return false
  }

  return execute(tape, position, accumulator)
}

function parseArgument(argument) {
  const sign = argument[0]
  const value = +argument.slice(1)
  return { sign, value }
}

function sum(num, argument) {
  const { sign, value } = parseArgument(argument)
  return eval(`${num} ${sign} ${value}`)
}

function clearTape(tape) {
  tape.forEach((cell) => (cell.callCount = 0))
}

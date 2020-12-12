const _ = require('lodash')
const fs = require('fs')

const a = fs
  .readFileSync('./input/day11.txt', 'utf8')
  .split('\n')
  .filter(Boolean)

const rowLength = a[0].length
const rowQuantity = a.length

let seats = a
  .join()
  .replace(/,/g, '')
  .split('')

settle(seats)
function settle(seats) {
  let newSeats = seats
  do {
    seats = newSeats
    newSeats = doSinglePass(seats)
  } while (!_.isEqual(newSeats, seats))

  // logSeats(newSeats)
  const occupiedCount = newSeats.reduce((sum, seat) => (seat === '#' ? sum + 1 : sum), 0)
  console.log('occupiedCount: ', occupiedCount)
}

function doSinglePass(seats) {
  const newSeats = _.cloneDeep(seats)

  seats.forEach((seat, index) => {
    if (seat === '.') {
      return
    }
    const adjacentCount = getAdjacentCount(seats, index)
    // TODO: JOEY didn't take into account if seat was already empty or not,
    // but shouldn't matter for algorithm
    if (adjacentCount === 0) {
      newSeats[index] = '#'
    } else if (adjacentCount >= 4) {
      newSeats[index] = 'L'
    }
  })

  return newSeats
}

function getAdjacentCount(seats, index, log = () => {}) {
  const locations = findLocationInfo(index)

  const positionData = [
    { position: index - rowLength - 1, exclude: ['top', 'left'] },
    { position: index - rowLength, exclude: ['top'] },
    { position: index - rowLength + 1, exclude: ['top', 'right'] },
    { position: index - 1, exclude: ['left'] },
    { position: index + 1, exclude: ['right'] },
    { position: index + rowLength - 1, exclude: ['bottom', 'left'] },
    { position: index + rowLength, exclude: ['bottom'] },
    { position: index + rowLength + 1, exclude: ['bottom', 'right'] },
  ]

  const filteredPositionsData = positionData.filter(({ position, exclude }) => {
    return !exclude.some((exclusion) => locations.includes(exclusion))
  })

  log(filteredPositionsData)

  return filteredPositionsData.reduce((sum, { position }) => {
    return seats[position] === '#' ? sum + 1 : sum
  }, 0)
}

function findLocationInfo(index) {
  const locations = []
  if (index < rowLength) {
    locations.push('top')
  } else if (index > (rowQuantity - 1) * rowLength) {
    locations.push('bottom')
  }

  if (index % rowLength === rowLength - 1) {
    locations.push('right')
  } else if (index % rowLength === 0) {
    locations.push('left')
  }
  return locations
}

function logSeats(seats) {
  console.log('Seats:')
  _.chunk(seats, rowLength)
    .map((rows) => rows.join(''))
    .forEach((row) => console.log(row))
  console.log('')
}

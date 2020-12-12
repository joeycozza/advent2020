const _ = require('lodash')
const fs = require('fs')

const headings = ['north', 'east', 'south', 'west']
let curHeading = 'east'
let waypoint = { ns: 1, ew: 10 }
let location = { ns: 0, ew: 0 }

const differences = fs
  .readFileSync('./input/day12.txt', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((a) => ({ command: a[0], value: +a.slice(1) }))
  .forEach(({ command, value }) => {
    let headingsToMove
    let curIndex
    let newIndex
    switch (command) {
      case 'N':
        waypoint.ns += value
        break
      case 'S':
        waypoint.ns -= value
        break
      case 'E':
        waypoint.ew += value
        break
      case 'W':
        waypoint.ew -= value
        break
      case 'L':
        rotationsToDo = value / 90
        for (let i = 0; i < rotationsToDo; i++) {
          temp = waypoint.ew
          waypoint.ew = -waypoint.ns
          waypoint.ns = temp
        }
        break
      case 'R':
        rotationsToDo = value / 90
        for (let i = 0; i < rotationsToDo; i++) {
          temp = waypoint.ew
          waypoint.ew = waypoint.ns
          waypoint.ns = -temp
        }
        break
      case 'F':
        location.ew += value * waypoint.ew
        location.ns += value * waypoint.ns
        break
      default:
        console.log('Default Case')
    }
    console.log('location: ', location)
    console.log('waypoint: ', waypoint)
    console.log('')
  })

console.log(Math.abs(location.ns) + Math.abs(location.ew))

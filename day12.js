const _ = require('lodash')
const fs = require('fs')

const headings = ['north', 'east', 'south', 'west']
let curHeading = 'east'
let waypoint = { ns: 0, ew: 0 }
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
        // console.log('Moved North')
        location.ns += value
        break
      case 'S':
        // console.log('Moved South')
        location.ns -= value
        break
      case 'E':
        // console.log('Moved East')
        location.ew += value
        break
      case 'W':
        // console.log('Moved West')
        location.ew -= value
        break
      case 'L':
        headingsToMove = value / 90
        curIndex = headings.findIndex((heading) => heading === curHeading)
        newIndex = (curIndex - headingsToMove + 4) % 4
        curHeading = headings[newIndex]
        break
      case 'R':
        headingsToMove = value / 90
        curIndex = headings.findIndex((heading) => heading === curHeading)
        newIndex = (curIndex + headingsToMove) % 4
        curHeading = headings[newIndex]
        break
      case 'F':
        switch (curHeading) {
          case 'east':
            location.ew += value
            break
          case 'west':
            location.ew -= value
            break
          case 'north':
            location.ns += value
            break
          case 'south':
            location.ns -= value
            break
          default:
            console.log('Default Case')
        }
        break
      default:
        console.log('Default Case')
    }
    // console.log('ns: ', ns)
    // console.log('ew: ', ew)
    // console.log('\n')
  })

console.log('The End')
console.log(Math.abs(location.ns) + Math.abs(location.ew))

const _ = require('lodash')
const fs = require('fs')

const headings = ['north', 'east', 'south', 'west']
let curHeading = 'east'
let nsPos = 0
let ewPos = 0

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
        nsPos += value
        break
      case 'S':
        // console.log('Moved South')
        nsPos -= value
        break
      case 'E':
        // console.log('Moved East')
        ewPos += value
        break
      case 'W':
        // console.log('Moved West')
        ewPos -= value
        break
      case 'L':
        // console.log('Turning Left')
        headingsToMove = value / 90
        curIndex = headings.findIndex((heading) => heading === curHeading)
        newIndex = (curIndex - headingsToMove + 4) % 4
        curHeading = headings[newIndex]
        break
      case 'R':
        // console.log('Turning Right')
        headingsToMove = value / 90
        curIndex = headings.findIndex((heading) => heading === curHeading)
        newIndex = (curIndex + headingsToMove) % 4
        curHeading = headings[newIndex]
        break
      case 'F':
        // console.log('Moving Forward')
        switch (curHeading) {
          case 'east':
            ewPos += value
            break
          case 'west':
            ewPos -= value
            break
          case 'north':
            nsPos += value
            break
          case 'south':
            nsPos -= value
            break
          default:
            console.log('Default Case')
        }
        break
      default:
        console.log('Default Case')
    }
    // console.log('nsPos: ', nsPos)
    // console.log('ewPos: ', ewPos)
    // console.log('\n')
  })


console.log('The End')
console.log(Math.abs(nsPos) + Math.abs(ewPos))

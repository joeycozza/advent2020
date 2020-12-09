const _ = require('lodash')
const fs = require('fs')

const length = (str) => str.length
const removeNewlines = (str) => str.replace(/\n/g, '')
const splitByNewline = (str) => str.split('\n')
const splitByString = (str) => (str2) => str2.split(str)

const LOG = false
const log = LOG ? console.log : () => {}

const graph = fs
  .readFileSync('./input/day7.txt', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map(splitByString(' bags contain '))
  .reduce((graph, [containerColor, containeesString]) => {
    let containeeInfo = {}
    if (!containeesString.includes('no other bags')) {
      containeeInfo = containeesString.split(',').reduce((allContaineeData, containee) => {
        const regex = /(\d)((\s\w+){2})\s/gm
        const [, quantity, color] = regex.exec(containee)

        allContaineeData[color.trim()] = quantity
        return allContaineeData
      }, {})
    }

    graph[containerColor] = containeeInfo
    return graph
  }, {})

log('graph: ', graph)

searchForShinyGold(graph)

function searchForShinyGold(graph) {
  const colorEntries = Object.entries(graph)
  const visitedColors = []
  const goodBags = []

  colorEntries.forEach(([color, node]) => {
    log('starting color, node: ', color, node)
    visitNode(color, node)
  })

  function visitNode(color, childNode, currentLine = []) {
    log('\n')
    log('color: ', color)
    log('visitedColors: ', visitedColors)
    log('visitedColors.includes(color): ', visitedColors.includes(color))
    if (color === 'shiny gold') {
      log('found gold and returning!')
      goodBags.push(...currentLine)
      return
    }
    if (visitedColors.includes(color)) {
      log('returning early')
      if (goodBags.includes(color)) {
        log('current color of current line already visited and in good bag, so adding curline to goodBags')
        goodBags.push(...currentLine)
      }
      return
    }
    visitedColors.push(color)
    currentLine.push(color)
    log('childNode: ', childNode)
    log('currentLine: ', currentLine)
    log('goodBags: ', goodBags)

    log('childNode: ', childNode)
    Object.entries(childNode).forEach(([childColor, quantity]) => {
      log('childColor, childNode: ', childColor, graph[childColor])
      log('about to call visitNode')
      visitNode(childColor, graph[childColor], currentLine)
    })
    currentLine.pop()
  }

  console.log('goodBags: ', _.uniq(goodBags))
  console.log('goodBags: ', _.uniq(goodBags).length)
}

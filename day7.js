const _ = require('lodash')
const fs = require('fs')

const length = (str) => str.length
const removeNewlines = (str) => str.replace(/\n/g, '')
const splitByNewline = (str) => str.split('\n')
const splitByString = (str) => (str2) => str2.split(str)

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

        allContaineeData[color.trim()] = +quantity
        return allContaineeData
      }, {})
    }

    graph[containerColor] = containeeInfo
    return graph
  }, {})

const count = countBags('shiny gold')
console.log('count: ', count)

function countBags(color) {
  const children = graph[color]

  const allChildrenCount = Object.entries(children).reduce((sum, [childColor, childCount]) => {
    const deeperCount = childCount * (countBags(childColor) || 1)
    sum += deeperCount
    return sum
  }, 0)

  console.log(`${color} calculated to hold ${allChildrenCount} bags`)
  return allChildrenCount + 1
}


// searchForShinyGold(graph)
function searchForShinyGold(graph) {
  const colorEntries = Object.entries(graph)
  const visitedColors = []
  const goodBags = []

  colorEntries.forEach(([color, node]) => {
    visitNode(color, node)
  })

  function visitNode(color, childNode, currentLine = []) {
    if (color === 'shiny gold') {
      goodBags.push(...currentLine)
      return
    }

    if (visitedColors.includes(color)) {
      if (goodBags.includes(color)) {
        // already visited this color and added to goodBags, but need to add the currentLine
        // to goodBags in case one of ancestors is new
        goodBags.push(...currentLine)
      }
      return
    }

    visitedColors.push(color)
    currentLine.push(color)

    Object.entries(childNode).forEach(([childColor, quantity]) => {
      visitNode(childColor, graph[childColor], currentLine)
    })

    currentLine.pop()
  }

  console.log('goodBags: ', _.uniq(goodBags))
  console.log('goodBags: ', _.uniq(goodBags).length)
}

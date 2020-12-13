const _ = require('lodash')
const fs = require('fs')

let [stationArrivalTime, busses] = fs
  .readFileSync('./input/day13.txt', 'utf8')
  .split('\n')
  .filter(Boolean)

stationArrivalTime = Number(stationArrivalTime)
let earliestBusData = busses
  .split(',')
  .filter((a) => a !== 'x')
  .map(Number)
  .map((bus) => ({busId: bus, time: Math.ceil(stationArrivalTime / bus) * bus}))

earliestBusData = _.sortBy(earliestBusData, 'time')
const {busId, time} = earliestBusData[0]
const waitTime = time - stationArrivalTime

console.log('id: ', stationArrivalTime)
console.log('earliestBusData: ', earliestBusData)
console.log('waitTime * busId: ', waitTime * busId)

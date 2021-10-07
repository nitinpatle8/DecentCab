const path = require('path')
const fs = require('fs')
const solc = require('solc')

const contractFile = path.resolve(__dirname, 'contracts', 'Cab.sol')

console.log(contractFile)

contract = fs.readFileSync(contractFile, 'utf-8')

console.log(contract)

module.exports = solc.compile(contract, 1).contracts[':Cab']
// console.log(solc.compile(contract, 1))
'use strict'

// const { importFileParser } = require('./src/functions/importFileParser.js')
// const { importProductsFile } = require('./src/functions/importProductsFile.js')

const { importProductsFile } = require('src/functions/importProductsFile')
const { importFileParser } = require('src/functions/importFileParser')

module.exports.importFileParser = async (event) => {
  await importFileParser(event)
}
module.exports.importProductsFile = async (event) => {
  return await importProductsFile(event)
}

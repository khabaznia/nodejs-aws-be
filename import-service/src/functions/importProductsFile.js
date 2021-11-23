const AWS = require('aws-sdk')
const { buildErrorResponse, buildResponse } = require('../util/apiResponseBuilder')
const { BUCKET } = require('../contants/constants')
const { REGION } = require('../contants/constants')
const { FOLDER_NAME } = require('../contants/constants')

async function getSignedUrl (s3, filename) {
  console.log (`Try to put object with filename -> ${filename}`)
  return await s3.getSignedUrlPromise('putObject', {
    Bucket: BUCKET,
    Key: `${FOLDER_NAME}${filename}`,
    Expires: 60,
    ContentType: 'text/csv'
  })
}

module.exports.importProductsFile = async (event) => {
  console.log(event)
  let signedUrl
  try {
    const filename = event.queryStringParameters.name
    console.log(`File name requested -> ${filename}`)
    const s3 = new AWS.S3({ region: REGION })
    signedUrl = await getSignedUrl(s3, filename)
  } catch (e) {
    console.log('Error occurred')
    return buildErrorResponse(String(e))
  }
  console.log(`Signed url -> ${signedUrl}`)
  return buildResponse(signedUrl)
}
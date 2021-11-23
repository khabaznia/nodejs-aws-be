const AWS = require('aws-sdk')
const csv = require('csv-parser')
const util = require('util')
const stream = require('stream')
const { BUCKET } = require('../contants/constants')
const { REGION } = require('../contants/constants')

const finished = util.promisify(stream.finished)

function getObject (s3, record) {
  console.log('Try to get object from bucket')
  return s3.getObject({
    Bucket: BUCKET,
    Key: record.s3.object.key
  }).createReadStream()
}

async function copyObject (s3, record) {
  console.log(`Copy from ${BUCKET}/${record.s3.object.key}`)
  await s3.copyObject({
    Bucket: BUCKET,
    CopySource: `${BUCKET}/${record.s3.object.key}`,
    Key: record.s3.object.key.replace('uploaded', 'parsed')
  }).promise()
  console.log(`Record copied to ${BUCKET}/${record.s3.object.key.replace('uploaded', 'parsed')}`)
}

async function deleteObject (s3, record) {
  await s3.deleteObject({
    Bucket: BUCKET,
    Key: record.s3.object.key
  }).promise()
  console.log(`Record deleted ${BUCKET}/${record.s3.object.key}`)
}

async function processRecord (s3, record) {
  const s3Stream = getObject(s3, record)
  await finished(
    s3Stream.pipe(csv())
      .on('data', (data) => {
        console.log(data)
      })
      .on('end', async () => {
          await copyObject(s3, record)
          await deleteObject(s3, record)
        }
      )
  )
}

module.exports.importFileParser = async (event) => {
  console.log(event)
  const s3 = new AWS.S3({ region: REGION })
  return new Promise(() => {
    event.Records.forEach(record => processRecord(s3, record))
  })
}
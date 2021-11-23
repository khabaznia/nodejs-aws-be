function headers () {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
  }
}

module.exports.buildResponse = (url) => {
  return {
    statusCode: 202,
    headers: headers(),
    body: JSON.stringify(String(url))
  }
}

module.exports.buildErrorResponse = (message) => {
  return {
    statusCode: 500,
    headers: headers(),
    body: JSON.stringify({ message: message })
  }
}
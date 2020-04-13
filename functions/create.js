const shortid = require('shortid')
const { getMongoConnection } = require('../functions_src/mongo')
const { createResponse } = require('../functions_src/utils')
const  { ShortenedUrlModelName } = require('../functions_src/shortenedUrl.schema')

let conn = null

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

   conn = conn || await getMongoConnection()

  if (event.httpMethod === 'OPTIONS') {
    callback(null, createResponse(200, 'sucks'))
    return
  }

  if (event.httpMethod !== 'POST') {
    callback(null, createResponse(400, 'Only POST methods are allowed'))
    return
  }

  if (!event.body) {
    callback(null, createResponse(400, 'body is required'))
    return
  }

  const body = JSON.parse(event.body)

  const originalUrl = body.originalUrl

  if (!originalUrl) {
    callback(null, createResponse(400, 'Url is required'))
    return
  }

  const ShortenedUrlModel = conn.model(ShortenedUrlModelName)

  let doc = await ShortenedUrlModel.create(
    {
      originalUrl,
      urlCode: shortid.generate()
    }
  )

  callback(null, createResponse(200, doc))
}

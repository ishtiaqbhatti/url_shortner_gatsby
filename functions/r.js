const { getMongoConnection } = require('../functions_src/mongo')
const { createResponse } = require('../functions_src/utils')
const  { ShortenedUrlModelName } = require('../functions_src/shortenedUrl.schema')

let conn = null

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  conn = conn || await getMongoConnection()

  if (event.httpMethod !== 'GET') {
    callback(null, createResponse(400, 'Only GET method is accepted.'))
    return
  }

  const ShortenedUrlModel = conn.model(ShortenedUrlModelName)

  /**
   * The length of function fullpath
   * functions path defined by netlify    +    function path (filename)
   * '/.netlify/functions/'               +     'r/'
   * In this case 22
   */
  const urlCode = event.path.slice(22)

  const shortenedUrl = await ShortenedUrlModel.findOneAndUpdate({
      urlCode
    },
    {
      $inc: { clicksCounter: 1 },
      $set: {
        updatedAt: new Date().toISOString()
      }
    },
    { new: true
  })

  if(!shortenedUrl) {
    callback(null, createResponse(404, 'Shotened URL not found'))
    return
  }

  callback(null, {
    statusCode: 301,
    headers: {
      Location: shortenedUrl.originalUrl
    }
  })
}

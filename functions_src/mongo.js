const mongoose = require('mongoose')
const { config } = require('./config')
const { ShortenedUrlModelName, ShortenedUrlSchema } = require('./shortenedUrl.schema')

export const getMongoConnection = async () => {
  const connection = await mongoose.createConnection(config.MONGO_URL, {
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0, // and MongoDB driver buffering
    useNewUrlParser: true,
  })

  connection.model(ShortenedUrlModelName, ShortenedUrlSchema)

  return connection
}

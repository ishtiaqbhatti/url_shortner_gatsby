const mongoose = require('mongoose')

export const ShortenedUrlModelName = 'shortened-url'

export const ShortenedUrlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, require: true },
    urlCode: { type: String, require: true },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    clicksCounter: { type: Number, default: 0 }
  },
  {
    collection: ShortenedUrlModelName
  }
)

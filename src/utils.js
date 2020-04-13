import validUrl from 'valid-url'
import { config } from './config'

export const isValidUrl = (url) => {
  return validUrl.isWebUri(url)
}

export const generateFullURLCode = (location, urlCode) => {
  if(location.hostname === 'localhost') {
    return `${config.LAMBDA_ENDPOINT}/r/${urlCode}`
  }
  return `${location.origin}/${urlCode}`
}

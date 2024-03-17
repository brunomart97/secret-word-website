export const idGenerator = (text: string | number): string => {
  const randomString = Math.random().toString(16).substring(2, 8)
  const combinedString = `${text}-${randomString}`
  const hash = require('crypto')
    .createHash('md5')
    .update(combinedString)
    .digest('hex')
  return hash.substr(0, 8)
}

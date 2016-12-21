if (process.env.LOCAL) {
  console.log('using local FileSystem')
  module.exports = require('./local')
} else {
  console.log('using s3 FileSystem')
  module.exports = require('./s3')
}


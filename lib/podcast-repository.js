var S3Database = require('./s3-database')

const PodcastRepository = function (dbAdapter = S3Database) {
  var Db = new S3Database('sanbaradio-podcasts')

  this.search = function (filter) {
    return Db.search('pods.json', filter)
  }
}

module.exports = PodcastRepository

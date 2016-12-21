var FsDatabase = require('./fs-database')

const PodcastRepository = function (dbAdapter = new FsDatabase('sanbaradio-podcasts')) {
  var _fileName = 'pods.json'

  this.getByChannel = function (channel) {
    return dbAdapter.search(_fileName, {channel: channel})
  }
}

module.exports = PodcastRepository

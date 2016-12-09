const PodcastRepository = function (dbAdapter = S3Database) {
  var Db = new S3Database('sanbaradio-podcasts')

  this.search = function (searchTitle) {
    return Db.search('pods.json', {title: searchTitle})
    .then((podcasts) => {
      return podcasts
    })
  }
}

module.exports = PodcastRepository

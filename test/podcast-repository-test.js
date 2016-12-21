process.env.LOCAL = true

const assert = require('assert')
const PodcastRepository = require('../lib/podcast-repository')

describe('PodcastRepository', function () {
  this.timeout(10000)

  it('returns empty array if name not found', function () {
    var podcasts = new PodcastRepository()

    return podcasts.getByChannel('notfound')
    .then((pods) => {
      assert.deepEqual(pods, [])
    })
  })

  it('returns a simple item', function () {
    var expectedPayload = {
      "channel": "Burro d'Arachidi",
      "date": "2016-12-04T18:08:23.000Z",
      "description": "",
      "episode": "06x09",
       "file": {
         "length": "28750595",
         "type": "audio/mpeg",
         "url": "http://www.sanbaradio.it/files/barachidi_06x09.mp3"
       }
    }
    var podcasts = new PodcastRepository()

    return podcasts.getByChannel("Burro d'Arachidi")
    .then((pods) => {
      console.log(pods)
      assert.deepEqual(pods[0], expectedPayload)
    })
  })
})

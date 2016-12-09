const assert = require('assert')
const PodcastRepository = require('../lib/podcast-repository')

describe('PodcastRepository', function () {
  it('returns empty array if name not found', function () {
    var podcasts = new PodcastRepository()

    assert.deepEqual(podcasts.search('notfound'), [])
  })

  it('returns a simple item', function () {
    var expectedPayload = {"title":"Burro d'Arachidi - 06x09","file":{"url":"http://www.sanbaradio.it/files/barachidi_06x09.mp3","length":"28750595","type":"audio/mpeg"}}
    var podcasts = new PodcastRepository('sanbaradio-podcasts', 'pods.json')

    assert.deepEqual(podcasts.find("Burro d'Arachidi - 06x09"), [expectedPayload])
  })
})

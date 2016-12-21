const FileSystem = require('./filesystem')

const FsDatabase = function(folder) {
  var _collection = null

  function _getCollectionFrom(fileName) {
    if (_collection != null) {
      return new Promise((resolve, reject) => {resolve(_collection)})
    }

    var fs = new FileSystem()

    return fs.read(folder, fileName)
    .then((collectionContent) => {
      _collection = JSON.parse(collectionContent.Body.toString('utf-8'))
      return _collection
    })
    .catch((err) => err)
  }

  this.search = function(fileName, params) {
    return _getCollectionFrom(fileName)
    .then((collectionContent) => {
      return this.filter(collectionContent, params)
    })
  }

  this.filter = function(collection, params) {
    for(var key in params) {
      var term = params[key]
      collection = collection.filter((doc) => {
        return doc[key] === term
      })
    }
    return collection
  }
}


module.exports = FsDatabase

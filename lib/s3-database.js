const S3Database = function(database) {
  let collection = null

  function _getCollection(collection) {
    return new Promise((resolve, reject) => {
      if (collection !== null) {
        resolve(collection)
      } else {
        s3.getObject({
            Bucket: database,
            Key: collection
        }, (collectionContent) => {
          collection = collectionContent
          resolve(collectionContent)
        })
      }
    })
  }

  this.search = function(collection, param) {
    return _getCollection()
    .then((collection) => {
      var new_collection = collection

      for(var key in param) {
        var term = param[key]
        new_collection = new_collection.filter((doc) => {
          return doc[key] === term
        })
      }

      return new_collection
    })
  }
}


module.exports = S3Database

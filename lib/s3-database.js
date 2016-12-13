const aws = require('aws-sdk')

const S3Database = function(database) {
  var s3 = new aws.S3({signatureVersion: 'v4'})
  var _collection = null

  function _getCollection(collection) {
    return new Promise((resolve, reject) => {
      if (_collection != null) {
        resolve(_collection)
        return
      }

      s3.getObject({
          Bucket: database,
          Key: collection
      }, (err, collectionContent) => {
        if(err) {
          reject(err)
        }

        _collection = collectionContent
        resolve(JSON.parse(collectionContent.Body.toString('utf-8')))
      })
    })
  }

  this.search = function(collection, params) {
    return _getCollection(collection)
    .then((collectionContent) => {
      var new_collection = collectionContent
      return this.filter(new_collection, params)
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


module.exports = S3Database

var fs = require('fs')

module.exports = function () {
  var readFile = function(folder, fileName) {
    return new Promise((resolve, reject) => {
      fs.readFile(`${folder}/${fileName}`, 'utf8', function(err, data) {
         if (err) {
           reject(err)
         } else {
           resolve({Body: data})
           return
         }
       })
    })
  }

  var parseRange = function(range) {
    var rangeArr = range.split('bytes=').join('').split('-')
    var to = rangeArr[1]
    var from = rangeArr[0]
    var bufferLength = to - from

    return {
      from,
      to,
      bufferLength
    }
  }

  this.readAsStream = function (folder, fileName) {
    var stream = fs.createReadStream(`${folder}/${fileName}`)
    stream.setEncoding('utf8')

    return stream
  }

  this.writeAsStream = function (folder, fileName, stream) {
    return new Promise((resolve, reject) => {
      var writeStream = fs.createWriteStream(`${folder}/${fileName}`, { flags : 'w' })

      stream.setEncoding('utf8')

      stream.on('data', function(chunk) {
          writeStream.write(chunk)
      })
      .on('end', function (data) {
        resolve({
          Location: `${folder}/${fileName}`,
          FileName: fileName,
          Folder: folder
        })
      })
      .on('error', function (err) {
        reject(err)
      })
    })
  }

  this.read = function(folder, fileName, range) {
    if(!range) {
      return readFile(folder, fileName)
    }

    return new Promise((resolve, reject) => {
      fs.open(`${folder}/${fileName}`, 'r', function(err, fileDescriptor) {
        if (err) {
          reject(err)
          return
        }

        var Range = parseRange(range)
        var buffer = new Buffer(Range.bufferLength)

        fs.read(fileDescriptor, buffer, 0, Range.bufferLength, Range.from, function(err, data) {
          if (err) {
            reject(err)
            return
          }
          resolve({Body: buffer.toString('utf8', 0, data)})
        })
      })
    })
  }

  this.head = function(folder, fileName) {
    return new Promise((resolve, reject) => {
      fs.stat(`${folder}/${fileName}`, function(err, stats) {
        if (err) {
          reject(err)
        } else {
          resolve({
            AcceptRanges: 'bytes',
            LastModified: stats.mtime,
            ContentLength: stats.size,
            ETag: null,
            ContentType: null,
            Metadata: {}
          })
        }
      })
    })
  }
}

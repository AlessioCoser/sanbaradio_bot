var botBuilder = require('claudia-bot-builder')
var telegramTemplate = require('claudia-bot-builder').telegramTemplate

module.exports = botBuilder(function (request) {

  return new telegramTemplate.Text('Hi!').get()
})

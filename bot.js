var botBuilder = require('claudia-bot-builder')

module.exports = botBuilder(function (request) {

  return 'Ciao grazie per avermi scritto questo: ' + JSON.stringify(request)
})

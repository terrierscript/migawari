var migawari = require('../index.js')
var assert = require('assert')
var cheerio = require('cheerio')
module.exports = function(selector){
  var html = migawari(selector)
  var $ = cheerio.load("<html>"+html+"</html>")
  assert($(selector).length > 0, selector + " is not hit in " + html)
}

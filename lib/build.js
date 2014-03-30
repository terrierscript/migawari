var util = require('util')
//var builder = require("./builder/cheerio")
var node = require('./selector/node')
var render = require('cheerio/lib/render')
var htmlparser = require('htmlparser2')

module.exports = function(tree, customFilter){
  return render(tree)
}

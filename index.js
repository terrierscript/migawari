//var defaults = require('defaults')
var parser = require('./lib/parser')
var build = require('./lib/build')
var combinator = require('./lib/combinator')

module.exports = function(selector){
  var htmls = []
  var parsed = parser(selector)
  var tree = combinator(parsed)
  return build(tree)
}

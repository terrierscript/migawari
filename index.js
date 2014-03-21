//var defaults = require('defaults')
var parser = require('./lib/parser')
var build = require('./lib/build')
var combinator = require('./lib/combinator')
var defaults = require('defaults')
module.exports = function(selector, opts){
  var options = defaults(opts, {
    text : null
  })
  var htmls = []
  // slick : selector parser
  var parsed = parser(selector)
  // reconstruct ree
  var tree = combinator(parsed)
  // do build
  return build(tree, options)
}

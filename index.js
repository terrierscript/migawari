//var defaults = require('defaults')
var parser = require('./lib/parser')
var build = require('./lib/build')
var tree = require('./lib/selector/tree')
var defaults = require('defaults')
module.exports = function(selector, customFilter){
  var htmls = []
  // slick : selector parser
  var parsed = parser(selector)
  // reconstruct ree
  var parsedTree = tree(parsed)
  // set fake root container selector
  parsedTree.selector = {
    text : ""
  }

  // do build
  return build(parsedTree, customFilter)
}

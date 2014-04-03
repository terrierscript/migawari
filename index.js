//var defaults = require('defaults')
var parser = require('./lib/parser')
var build = require('./lib/build')
var tree = require('./lib/selector/tree')
var defaults = require('defaults')

module.exports = function(selector, customFilter){
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

module.exports.domtree = function(selector, customFilter){
  var parsed = parser(selector)
  return tree(parsed)
}

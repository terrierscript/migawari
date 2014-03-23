var util = require('util')

var builder = require("./builder/cheerio")
var node = require('./selector/node')

module.exports = function(tree){
  return builder.toHTML(build(tree))
}

// build node tree (recursive)
function build(treeNode){
  var nodeInfo = node(treeNode.selector)
    
  var parent = builder.build(nodeInfo)
  treeNode.children.forEach(function(child){
    builder.addChild(parent, build(child))
  })
  return parent
}
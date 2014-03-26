var util = require('util')

var builder = require("./builder/cheerio")
var node = require('./selector/node')

module.exports = function(tree, customFilter){
  return builder.toHTML(build(tree, customFilter))
}

// build node tree (recursive)
function build(treeNode, customFilter){
  var nodeInfo = node(treeNode.selector)

  var parent = builder.build(nodeInfo, customFilter)
  treeNode.children.forEach(function(child){
    builder.addChild(parent, build(child, customFilter))
  })
  return parent
}

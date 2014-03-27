var util = require('util')
var builder = require("./builder/cheerio")
var node = require('./selector/node')
var render = require('cheerio/lib/render')

module.exports = function(tree, customFilter){
  var dom = build(tree, customFilter)
  return render(dom)
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

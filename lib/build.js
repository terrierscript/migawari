var util = require('util')

var render = require("./builder/cheerio")
var node = require('./selector/node')

module.exports = function(tree){
  return render.toHTML(build(tree))
}

// build node tree (recursive)
function build(treeNode){
  var nodeInfo = node(treeNode.selector)
    
  var parent = render.build(nodeInfo)
  treeNode.children.forEach(function(child){
    render.addChild(parent, build(child))
  })
  return parent
}
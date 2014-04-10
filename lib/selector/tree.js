//var node = require('./node')
var leaf = require("./leaf")
var domutils = require("domutils")

var node = function(selector){
  return {
    selector : selector,
    children : []
  }
}
module.exports = function(selectorObjects){
  var root = node()
  selectorObjects.forEach(function(selectorBlock){
    var parent = root
    var prevParent = root

    selectorBlock.forEach(function(selector, index){
      var child = leaf(selector)

      //parent.children.push(child)
      domutils.appendChild(parent,child)
      if(selector.combinator){
        switch(selector.combinator.type){
        case "child":
        case "descendant":
          parent = child
        }
      }

    })
  })
  return root
}

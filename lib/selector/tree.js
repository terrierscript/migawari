var leaf = require("./leaf")
var domutils = require("domutils")

module.exports = function(selectorObjects){
  var root = leaf()
  selectorObjects.forEach(function(selectorBlock){
    var parent = root
    selectorBlock.forEach(function(selector, index){
      var child = leaf(selector)
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
  // remove root parent
  root.children.forEach(function(child){
    child.parent = null
  })
  return root.children
}

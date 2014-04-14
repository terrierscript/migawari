var domutils = require("domutils")

module.exports = function(selectorObjects, leafFn){
  var root = leafFn()

  selectorObjects.forEach(function(selectorBlock){
    var parent = root
    selectorBlock.forEach(function(selector, index){
      var child = leafFn(selector)
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

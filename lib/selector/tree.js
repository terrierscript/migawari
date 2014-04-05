//var node = require('./node')

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
      var child = node(selector)

      parent.children.push(child)
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

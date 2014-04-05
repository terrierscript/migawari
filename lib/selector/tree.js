//var node = require('./node')

var node = function(selector){
  if(selector === undefined){
    selector = defaults = { combinator: ' ',
       tag: '*'
     }
  }
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

      var putDummy = function(parent){
        var dummy = node()
        parent.children.push(dummy)
        return dummy
      }
      switch(selector.combinator){
        // brother
        case '~':
          putDummy(prevParent)
        case '+':
          parent = prevParent
          break
        // child
        case ' ':
          if(index == 0) break;
          dummy = putDummy(parent)
          parent = dummy
        case '>':
        default:
      }
      prevParent = parent
      // DOM
      parent.children.push(child)
      
      parent = child
    })
  })
  return root
}

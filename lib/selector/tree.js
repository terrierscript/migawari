var node = require('./node')

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
        dummy.parent = parent
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
      child.parent = parent

      parent = child
    })
  })
  return root
}

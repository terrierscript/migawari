var node = require('./node')

module.exports = function(selectorObjects){
  var root = node()
  selectorObjects.forEach(function(selectorBlock){
    var parent = root
    var prevParent = root

    selectorBlock.forEach(function(selector){
      var child = node(selector)
      switch(selector.combinator){
        // brother
        case '+':
        case '~':
          parent = prevParent
          break
        // child
        case ' ':
          //dummy = node() //add dummy
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

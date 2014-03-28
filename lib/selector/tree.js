var node = require('./node')

module.exports = function(selectorObjects){
  var root = node({})
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
        // do child
        case ' ':
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

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
      parent.children.push(child)
      parent = child
    })
  })
  return root
}

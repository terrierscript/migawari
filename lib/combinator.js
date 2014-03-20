module.exports = function(selectorObjects){
  var root = {
    children : []
  }
  var parent = root
  var prevParent = root
  selectorObjects.forEach(function(selectorBlock){
    selectorBlock.forEach(function(selector){
      var node = {
        selector : selector,
        children : []
      }
      
      switch(selector.combinator){
        // brother
        case '+':
          parent = prevParent
          break
        // do child
        case ' ':
        case '>':
        default:
      }
      prevParent = parent
      parent.children.push(node)
      parent = node
    })
  })
  return root
}

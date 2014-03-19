var TreeModel = require('tree-model')
module.exports = function(selectorObjects){
  var tree = new TreeModel();

  selectorObjects.forEach(function(selectorBlock){
    var children = []
    var brothers = []

    selectorBlock.forEach(function(selector){
      switch(selector.combinator){
        // brother
        case '+':
          brothers.push(selector)
          break
        // do child
        case ' ':
        case '>':
        default:
          children.push(selector)
      }
    })
    // push
    selectorBlock.children = children
    tree.push(selectorBlock)
    if(brothers.length > 0){
      tree.push(brothers)
    }
  })
  return tree
}


module.exports = function(selectorObjects){
  var output = []
  selectorObjects.forEach(function(selectorBlock){
    var processed = []
    var after = []
    selectorBlock.forEach(function(selector){
      switch(selector.combinator){
        case '+':
          after.push(selector)
          break
        case ' ':
        case '>':
        default:
          processed.push(selector)
      }
    })
    // push
    output.push(processed)
    if(after.length > 0){
      output.push(after)
    }
  })
  return output
}

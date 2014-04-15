var parser = require("CSSwhat")
var chunkwhat = require("chunkwhat")
module.exports = function(selectorString){
  var selectors = parser(selectorString)
  selectors = selectors.map(function(selector){
    // dummy insert
    return insertDummySelector(selector)
  })
  c = chunkwhat(selectors)
  return c
}

var insertDummySelector = function(selector){
  var inserted = []
  selector.forEach(function(token){
    switch(token.type){
    case "descendant":
      inserted.push({ type : "child"})
      inserted.push({ type : "child"})
      break
    case "sibling":
      inserted.push({ type : "adjacent"})
      inserted.push({ type : "adjacent"})
      break
    default:
      inserted.push(token)
    }
  })
  return inserted
}

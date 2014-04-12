var parser = require("CSSwhat")

module.exports = function(selectorString){
  var selectors = parser(selectorString)
  return selectors.map(function(selector){
    selector = insertDummySelector(selector)
    var grouped = groupingSelector(selector)
    //console.log(require("util").inspect(grouped, {depth :null}))
    return grouped.map(function(group){
      return toAttrSet(group.token)
    })
  })
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

var isCombinator = function(sub){
  var combinators = [
   "child",
   "parent",
   "sibling",
   "adjacent",
   "descendant"
  ]
  return (combinators.indexOf(sub.type) > -1)
}

var toAttrSet = function(selector){
  var item = {
    tag : undefined,
    combinator : undefined,
    attributes : [],
  }

  selector.forEach(function(sub){
    switch(sub.type){
    case "tag":
      item.tag = sub
      break;
    case "attribute":
      item.attributes.push(sub)
      break;
    }
    // get combinator
    if(isCombinator(sub)){
      item.combinator = sub
    }
  })
  return item
}

var tokens = function(subs){
  return {
    token : subs,
  }
}

// Split by combinator
var groupingSelector = function(selector){
  var groups = []
  var chunk = []

  selector.forEach(function(token){
    chunk.push(token)
    if(isCombinator(token)){
      groups.push(tokens(chunk))
      chunk = []
    }
  })
  groups.push(tokens(chunk))
  return groups
}

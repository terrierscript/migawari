var parser = require("CSSWhat")
module.exports = function(selectorString){
  var selectors = parser(selectorString)
  return selectors.map(function(selector){
    var grouped = groupingSelector(selector)
    //console.log(require("util").inspect(grouped, {depth :null}))
    return grouped.map(function(group){
      return toAttrSet(group.token)
    })
  })
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
    if(isCombinator(token)){
      groups.push(tokens(chunk))
      chunk = []
    }
    chunk.push(token)
  })
  groups.push(tokens(chunk))
  return groups
}

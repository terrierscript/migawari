var parser = require("CSSwhat")

module.exports = function(selectorString){
  var selectors = parser(selectorString)
  return selectors.map(function(selector){
    // dummy insert
    selector = insertDummySelector(selector)
    // chunk selectors
    return groupingSelector(selector).map(function(group){
      return fixupTokens(group.token)
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
  switch(sub.type){
  case "child":
  case "parent":
  case "sibling":
  case "adjacent":
  case "descendant":
    return true
  }
  return false
}

var fixupTokens = function(tokens){
  var item = {
    tag : undefined,
    combinator : undefined,
    attributes : [],
  }

  tokens.forEach(function(sub){
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
  // push ends
  groups.push(tokens(chunk))
  return groups
}

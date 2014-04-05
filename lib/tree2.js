module.exports = function(selectors){
  var root = {
  }
  root.children = selectors.map(groupingSelector)
  return root
}

var selectorSub = function(subs){
  return {
    selectorSub : subs,
  }
}
// Split by combinator
var groupingSelector = function(selector){
  var groups = []
  var chunk = []
  selector.forEach(function(sub){
    switch(sub.type){
    case "child":
    case "parent":
    case "sibling":
    case "adjacent":
      groups.push(selectorSub(chunk))
      chunk = []
    }
    chunk.push(sub)
  })
  groups.push(selectorSub(chunk))

  return {
    selector : groups,
    children : []
  }
}

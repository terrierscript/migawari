var leaf = require("./leaf")
var domutils = require("domutils")

module.exports = function(selectorObjects){
  var root = []
  selectorObjects.forEach(function(selectorBlock){
    var parent = root
    selectorBlock.forEach(function(selector, index){
      var child = leaf(selector)

      if(!require("util").isArray(parent)){
        domutils.appendChild(parent,child)
      }else{
        parent.push(child)
      }
      if(selector.combinator){
        switch(selector.combinator.type){
        case "child":
        case "descendant":
          parent = child
        }
      }

    })
  })
  return root
}

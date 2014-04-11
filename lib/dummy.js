var leaf = require("./selector/leaf")
var traverse = require("traverse")
var clone = require("clone")

var fusion = function(elm, dummyElm){
  dummyElm.parent = elm.parent
}
var dummyLeaf = function(elm, overwrite){
  if(typeof overwrite === "string"){
    elm.name = overwrite
  }

  return elm
}
module.exports = function(dom, dummyOverwrite){
  dom = traverse(dom).map(function(x){
    if(!x || this.circular) return x
    if(x.type !== "tag") return x
    if(x.name !== null) return x

    return dummyLeaf(x, dummyOverwrite)
  })
  return dom
}

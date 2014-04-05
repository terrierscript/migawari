var parser = require('./lib/parser')
var tree = require('./lib/selector/tree')
var leaf = require("./lib/selector/leaf")
var render = require('cheerio/lib/render')
var traverse = require("traverse")

var Migawari = function(selector){
  this.selector = selector
  parsed = parser(selector)
  var t = tree(parsed)

  // dom
  domTree = traverse(t).map(function(x){
    if(!x || !x.children) return x;
    var dom = leaf(x.selector)
    dom.children = x.children
    return dom
  })
  this.dom = domTree.children
}

Migawari.prototype.toString = function(){
  return render(this.dom)
}

module.exports = function(selector){
  return new Migawari(selector)
}

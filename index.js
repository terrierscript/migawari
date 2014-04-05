//var defaults = require('defaults')
var parser = require('./lib/parser')
var tree = require('./lib/selector/tree')
var node = require("./lib/selector/node")
var defaults = require('defaults')
var render = require('cheerio/lib/render')
var traverse = require("traverse")
var Migawari = function(selector){
  this.selector = selector
  this.parsed = parser(selector)
  var t = tree(this.parsed)

  // node to dom
  this.domTree = traverse(t).map(function(x){
    if(!x || !x.children) return x;
    var dom = node(x.selector)
    dom.children = x.children
    return dom
  })
}

Migawari.prototype.toString = function(){
  return render(this.domTree)
}

module.exports = function(selector){
  return new Migawari(selector)
}

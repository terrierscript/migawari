var parser = require('./lib/parser')
var tree = require('./lib/selector/tree')
var leaf = require("./lib/selector/leaf")
var render = require('cheerio/lib/render')
var traverse = require("traverse")
var domutils = require("domutils")
var clone = require("clone")

var Migawari = function(selector){
  this.selector = selector
  parsed = parser(selector)
  var domTree = tree(parsed)

  //console.log(require("util").inspect(domTree, {depth:null}))

  this.dom = domTree.children
}

Migawari.prototype.toString = function(){
  return render(this.dom)
}

module.exports = function(selector){
  return new Migawari(selector)
}

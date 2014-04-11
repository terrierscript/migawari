var parser = require('./lib/parser')
var tree = require('./lib/selector/tree')
var leaf = require("./lib/selector/leaf")
var render = require('./lib/render')
var traverse = require("traverse")
var domutils = require("domutils")
var clone = require("clone")

var Migawari = function(selector){
  this.selector = selector
  parsed = parser(selector)
  this.dom = tree(parsed)
  //console.log(require("util").inspect(domTree, {depth:null}))
}

Migawari.prototype.toString = function(){
  return render(this.dom)
}

module.exports = function(selector){
  return new Migawari(selector)
}

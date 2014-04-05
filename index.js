var parser = require('./lib/parser')
var tree = require('./lib/selector/tree')
var defaults = require('defaults')
var render = require('cheerio/lib/render')

var Migawari = function(selector){
  this.selector = selector
  this.parsed = parser(selector)
  // function
  this.domTree = tree(this.parsed)
}

Migawari.prototype.toString = function(){
  return render(this.domTree)
}

module.exports = function(selector){
  return new Migawari(selector)
}

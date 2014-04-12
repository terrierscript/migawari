var parser = require('./lib/parser')
var tree = require('./lib/selector/tree')
var leaf = require('./lib/selector/leaf')
var render = require('./lib/render')
var defaults = require("defaults")

var Migawari = function(selector, option){
  var option = defaults(option , {
    dummy : "div"
  })

  var parsed = parser(selector)
  var leafFn = leaf(option.dummy)

  this.dom = tree(parsed, leafFn)
}

Migawari.prototype.toString = function(){
  return render(this.dom)
}

module.exports = function(selector, option){
  return new Migawari(selector, option)
}

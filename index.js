var parser = require('./lib/parser')
var tree = require('./lib/selector/tree')
var render = require('./lib/render')
var dummy = require("./lib/dummy")
var Migawari = function(selector, opt){
  this.selector = selector
  this.opt = opt || {}
  parsed = parser(selector)
  this.dom = tree(parsed)
  //console.log(require("util").inspect(domTree, {depth:null}))
}

Migawari.prototype.toString = function(dummyTagName){
  dummyTagName = dummyTagName || this.opt.dummy || "div"
  var dom = dummy(this.dom, dummyTagName)
  return render(dom)
}


module.exports = function(selector, opt){
  return new Migawari(selector, opt)
}

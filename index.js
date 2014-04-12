var parser = require('./lib/parser')
var tree = require('./lib/selector/tree')
var render = require('./lib/render')
var dummy = require("./lib/dummy")
var Migawari = function(selector, opt){
  this.selector = selector
  this.opt = opt || {}
  parsed = parser(selector)
  this._dom = tree(parsed)
  //console.log(require("util").inspect(domTree, {depth:null}))
}

Migawari.prototype.toString = function(){
  return render(this.dom)
}


Migawari.prototype.dummyTagName = function(dummy){
  return dummy || this.opt.dummy || "div"
}

Object.defineProperty(Migawari.prototype, "dom", {
  get: function(){
    return dummy(this._dom, this.dummyTagName())
  }
})

Object.defineProperty(Migawari.prototype, "rawDom", {
  get: function(){
    return this._dom
  }
})

module.exports = function(selector, opt){
  return new Migawari(selector, opt)
}

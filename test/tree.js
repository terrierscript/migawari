var util = require('util')
var assert = require('assert')
var tree = require('../lib/selector/tree')
var parser = require("../lib/parser")
var render = require('cheerio/lib/render')


// TODO: packaging
var intersect = require("intersect")
var traverse = require("traverse")
var filter = function(tree){
  var wrap = {
    item : tree
  }
  var extractKeys = [
    "name","children"
  ]
  traverse(wrap).forEach(function(){

    if(typeof this.node !== "object") return
    if(this.isRoot) return
    var objectKeys = Object.keys(this.node)
    var keys = intersect(extractKeys, objectKeys)
    if(keys.length < extractKeys.length) return // TODO
    var newObj = {}
    var node = this.node
    keys.forEach(function(k){
      newObj[k] = node[k]
    })
    //return newObj // for map
    this.update(newObj)
  })
  return wrap.item
}


var itTree = function(selector, expect){
  it(selector, function(){
    assertTree(selector, expect)
  })
}
var assertTree = function(selector, expect){
  var p = parser(selector)
  var t = filter(tree(p))
  assert.deepEqual(expect, t)
}
// a
// + b
// + c
describe('tree', function(){
  itTree("a", {
    name : "div",
    children : [{
      name : "a",
      children : []
    }]
  })

  itTree("a b",{
    name : "div",
    children : [{
      name : "a",
      children : [{
        name : "div", //dummy
        children : [{
          name : "b",
          children :[]
        }]
      }]
    }]
  })
  itTree("a > b + p", {
    name :"div",
    children : [{
      name : "a",
      children : [{
        name : "b",
        children : []
      }, {
        name : "p",
        children : []
      }]
    }]
  })
  it("a ~ p")
  it("a , b")
})

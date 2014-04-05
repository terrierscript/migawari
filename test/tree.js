var assert = require('assert')
var tree = require('../lib/selector/tree')
var parser = require("../lib/parser")
var traverse = require("traverse")

var dump = function(obj){
  var util = require('util')
  console.log(util.inspect(obj, {depth: null}))
}

var testable = function(tree){
  var wrap = {
    obj : tree
  }
  return traverse(wrap).map(function(x){
    if(!x || !x.children) return x;
    var name = undefined
    try{
      name = x.selector.tag.name
    }catch(e){
      name = "*"
    }
    return {
      name : name,
      children : x.children
    }
  }).obj
}

var assertTree = function(selector, expect){
  var p = parser(selector)
  var tr = tree(p)
  var t = testable(tr)
  //dump(tr)
  dump(t)

  var dbg = traverse(t).reduce(function(acc, t){
    return (this.isLeaf && typeof t === "string") ? acc + " "+ t : acc
  })
  assert.deepEqual(expect, t)
}

var itTree = function(selector, expect, memo){
  it(selector + " " + memo, function(){
    assertTree(selector, expect)
  })
}

// a
// + b
// + c
describe('tree', function(){
  itTree("a", {
    name : "*",
    children : [{
      name : "a",
      children : []
    }]
  })

  itTree("a b",{
    name : "*",
    children : [{
      name : "a",
      children : [{
        name : "*", //dummy
        children : [{
          name : "b",
          children :[]
        }]
      }]
    }]
  })
  itTree("a ~ p", {
    name : "*",
    children : [{
      name : "a",
      children : []
    },{
      name : "*", //dummy
      children : []
    },{
      name : "p",
      children : []
    }]
  })
  itTree("a , b", {
    name : "*",
    children : [{
      name : "a",
      children : []
    },{
      name : "b",
      children : []
    }]

  })

  itTree("a > b + p", {
    name :"*",
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
  }, "dddd")
})

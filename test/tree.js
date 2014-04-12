var assert = require('assert');

var tree = require('../lib/selector/tree')
var parser = require("../lib/parser")
var traverse = require("traverse")

var getTestableTree = function(tree){
  var wrap = {
    obj : tree
  }
  return traverse(wrap).map(function(x){
    if(!x || !x.children) return x;
    //if(!x.name) return x;
    return {
      name : x.name,
      children : x.children,
      next : x.next
    }
  }).obj
}

var assertTree = function(selector, expect){
  var p = parser(selector)
  var tr = tree(p)
  var t = getTestableTree(tr)
  //console.log(require("util").inspect(t, {depth:null}))


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
  itTree("a", [{
    name : "a",
    children : [],
    next : null,
  }])

  itTree("a b",[{
    name : "a",
    next : null,
    children : [{
      name : null, //dummy
      next : null,
      children : [{
        name : "b",
        next : null,
        children :[]
      }]
    }]
  }])
  itTree("a ~ p", [{
    name : "a",
    next : {
      name : null,
      next : {
        name : "p",
        next : null,
        children : []
      },
      children : []
    },
    children : []
  },{
    name : null,
    next : {
      name : "p",
      next : null,
      children : []
    },
    children : []
  },{
    name : "p",
    next : null,
    children : []
  }])
  itTree("a , b", [{
    name : "a",
    next : {
      name : "b",
      next : null,
      children :[]
    },
    children : []
  },{
    name : "b",
    next : null,
    children : []
  }])

  itTree("a > b + p", [{
    name : "a",
    next : null,
    children : [{
      name : "b",
      next : {
        name : "p",
        next : null,
        children : []
      },
      children : []
    }, {
      name : "p",
      next : null,
      children : []
    }]
  }])
})

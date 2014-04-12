var assert = require('assert');

var tree = require('../lib/selector/tree')
var parser = require("../lib/parser")
var traverse = require("traverse")
var htmlparser = require("htmlparser2")

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
      name : "div", //dummy
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
      name : "div", //dummy
      next : {
        name : "p",
        next : null,
        children : []
      },
      children : []
    },
    children : []
  },{
    name : "div", //dummy
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
describe("htmlparser compatible", function(){
  describe("parent", function(){
    it("htmlparser is same cirucular strictly", function(){
      var cp = htmlparser.parseDOM("<a><b></b></a>")[0]
      assert.strictEqual(cp.children[0].parent, cp)
    })
    it("migwari is same cirucular strictly" , function(){
      var p = parser("a b")
      var tr = tree(p)[0]
      assert.strictEqual(tr.children[0].parent, tr)
    })
  })
  describe("brother", function(){
    it("htmlparser is same cirucular strictly", function(){
      var compatible = htmlparser.parseDOM("<a></a><b></b>")[0]
      assert.strictEqual(compatible.next.prev, compatible)
    })
    it("migwari is same cirucular strictly" , function(){
      var p = parser("a + b")
      var tr = tree(p)[0]
      assert.strictEqual(tr.next.prev, tr)
    })
  })
})

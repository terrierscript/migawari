var migawari = require("../")
var assert = require("assert")
var parser = require("htmlparser2")

describe("htmlparser compatible", function(){
  it("child", function(){
    var m = migawari("a > b")
    var p = parser.parseDOM(m.toString())
    assert(m.dom, p)
  })
  it("brother", function(){
    var m = migawari("a + b")
    var p = parser.parseDOM(m.toString())
    assert(m.dom, p)
  })
  it("attr", function(){
    var m = migawari("a[foo='bar']")
    var p = parser.parseDOM(m.toString())
    assert(m.dom, p)
  })
})

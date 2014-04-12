var migawari = require("../index")
var assert = require("assert")
describe("properties", function(){
  it("rawDom props", function(){
    var m = migawari("a b")
    assert.strictEqual(m.rawDom[0].children[0].name, null)
  })
  it("dom props", function(){
    var m = migawari("a b")
    assert.strictEqual(m.dom[0].children[0].name, "div")
  })
})

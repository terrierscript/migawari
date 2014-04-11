var migawari = require("../index")
var assert = require("assert")

// for readme
var readmeOutput = function(selector, html){
  console.log("migawari('" + selector + "');\t" +"//"+html )
}

describe("render", function(){
  var itAssert = function(selector, html){
    it(selector, function(){
      assert.equal(migawari(selector).toString(), html)
    })
    // if update readme
    //readmeOutput(selector,html)
  }
  itAssert("a",'<a></a>')
  itAssert(".c",'<div class="c"></div>')
  itAssert("#d",'<div id="d"></div>')
  itAssert("a[title='foo']",'<a title="foo"></a>')
  itAssert("a > b",'<a><b></b></a>')
  itAssert("a , b",'<a></a><b></b>')
  itAssert("a + b",'<a></a><b></b>')
  itAssert("a > b + .c",'<a><b></b><div class="c"></div></a>')
  // descendant and sibilings insert dummy
  itAssert("a ~ b",'<a></a><div></div><b></b>')
  itAssert("a b",'<a><div><b></b></div></a>')
})
describe("default tag", function(){
  it("defaultTag Option", function(){
    assert.equal(migawari("a b ~ p", {dummy: "i"}).toString(),
      "<a><i><b></b><i></i><p></p></i></a>")
    assert.equal(migawari(".c",  {dummy: "span"}).toString(), '<span class="c"></span>')
  })
})

var migawari = require("../index")
var assert = require("assert")
var itAssert = function(selector, html){
  it(selector, function(){
    assert.equal(migawari(selector).toString(), html)
  })
  // if update readme
  console.log("console.log('" + selector + "');\t" +"//"+html )
}
describe("render", function(){
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

var leaf = require('../lib/selector/leaf')
var parser = require("../lib/parser")
var render = require('cheerio/lib/render')
var assert = require('assert')

var createNode = function(selector){
  var p = parser(selector)[0][0]
  var n = leaf(p)
  return render(n)
}
describe('leaf output', function(){
  it('only tag', function(){
    assert.equal( createNode("a"), "<a></a>")
  })
  it('only class', function(){
    assert.equal( createNode(".foo"), '<div class="foo"></div>')
  })
  it('class attr', function(){
    assert.equal( createNode('.foo[class="bar"]'), '<div class="foo bar"></div>')
  })
  it("id", function(){
    assert.equal( createNode('#baz'), '<div id="baz"></div>')
  })
  it("attr", function(){
    assert.equal( createNode('img[title="boo"]'), '<img title="boo">')
  })
})

var leaf = require('../lib/selector/leaf')

var parser = require("../lib/parser")
var assert = require('assert')
var htmlparser = require("htmlparser2")
var createLeaf = function(selector){
  var generateLeaf = require('../lib/selector/leaf')()

  var p = parser(selector)[0][0]
  var n = generateLeaf(p)
  return n
}
describe('leaf output', function(){

  it('only tag', function(){
    assert.deepEqual( createLeaf("a"), {
      type:"tag",
      name:"a",
      attribs:{},
      children:[],
      parent:null,
      prev:null,
      next:null
    })
  })
  it('only class', function(){
    assert.deepEqual( createLeaf(".foo"), {
      type: 'tag',
      name: "div",
      attribs: { class: 'foo' },
      children: [],
      parent: null,
      prev: null,
      next: null
    })
  })
  it('class attr', function(){
    assert.deepEqual( createLeaf('.foo[class="bar"]'),{
      type: 'tag',
      name: "div",
      attribs: { class: 'foo bar' },
      children: [],
      parent: null,
      prev: null,
      next: null
    })
  })
  it("id", function(){
    assert.deepEqual( createLeaf('#baz'), {
      type: 'tag',
      name: "div",
      attribs: { id: 'baz' },
      children: [],
      parent: null,
      prev: null,
      next: null
    })
  })
  it("attr", function(){
    assert.deepEqual( createLeaf('img[title="boo"]'),{
      type: 'tag',
      name: 'img',
      attribs: { title: 'boo' },
      children: [],
      parent: null,
      prev: null,
      next: null
    })
  })
  
  // TODO: remove
  describe("htmlparser compatible", function(){
    it("basic", function(){
      var leaf = createLeaf("a")
      var compatible = htmlparser.parseDOM("<a></a>")[0]
      assert.deepEqual(leaf, compatible)
    })
  })
})

var cheerioBuilder = require("../lib/builder/cheerio")
var parser = require('../lib/parser')
var node = require('../lib/selector/node')
var render = require('cheerio/lib/render')

var assert = require('assert')
describe("cheerio",function(){
  it("data option", function(){
    var selector = "div.a"
    var parsed = node(parser(selector)[0][0])
    var $dom = cheerioBuilder.build(parsed, function($elm){
      $elm.attr("foo", "bar")
      return $elm
    })

    assert('<div class="a" foo="bar"></div>', render($dom))
  })
})

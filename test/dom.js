var migawari = require('../index.js')
var assert = require('assert')
var htmlparser = require("htmlparser2");

describe('asset dom', function(){

  var reparse = function(selector){
    var m = migawari(selector)
    var p = htmlparser.parseDOM(m.toString())
    return p
  }
  var assertDOM = function(selector){
    var m = migawari(selector)
    var p = htmlparser.parseDOM(m.toString())
    assert.deepEqual(m.dom, p)
  }
  it("basic", function(){
    assertDOM("a")
  })
  /*it("fn", function(){
    //migawari("a>b+p")
  })*/
})

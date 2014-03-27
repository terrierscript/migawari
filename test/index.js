var migawari = require('../index.js')
var assert = require('assert')
var cheerio = require('cheerio')
var assertCssSelector = require("./assertLib")
var t = function(selector, comment){
  comment = comment || ""
  it(selector +" "+ comment,  function(){
    //assert.equal(migawari(selector), html)
    assertCssSelector(selector)
  })
}

describe('basics', function(){
  t('a', 'only tag') //<a></a>
  t('*') //<div></div>
  t('.foo', 'only class') //<div class="foo"></div>
  t('a.foo','class and tag')
  t('.foo.bar', 'multi classes')
  t('.foo, .bar','parallel classes')
  t('#someid','id')
})

describe('combinators', function(){
  t('a > b', 'child')
  t('a b', 'ancestor')
  t('a + b', 'sibilings')
  t('a b + p', 'ancestor and sibilings')
  t('.a + b .c ', 'sibilings ancestor')
})

describe('attributes', function(){
  t('a.foo[href=hoge]')
  t('a.foo[href~=hoge]')
  t('a.foo[href$=hoge]')
  t('a.foo[href*=hoge]')
  t('a.foo[href=hoge][title="fuga"]')
  t('a.foo[href]')
  // jquery not supported?
  // t('a.foo[class="baz"]', 'attr has class')
})

describe("option", function(){
  it("data", function(){
    var sl ="div .a"
    var html = migawari(sl, function($elm, selector) {
      $elm.attr("data-selector", sl)
      //return $elm
    })
    console.log(html)
  })
})

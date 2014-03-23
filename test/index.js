var migawari = require('../index.js')
var assert = require('assert')
var cheerio = require('cheerio')
var assertCssSelector = function(selector){
  var html = migawari(selector)
  var $ = cheerio.load("<html>"+html+"</html>")
  assert($(selector).length > 0)
}
var t = function(selector, html, comment){
  comment = comment || ""
  it(selector +" "+ comment,  function(){
    assert.equal(migawari(selector), html)
    assertCssSelector(selector)
  })
}

describe('basics', function(){
  t('a','<a></a>', 'only tag')
  t('*','<div></div>')
  t('.foo','<div class="foo"></div>', 'only class')
  t('a.foo','<a class="foo"></a>','class and tag')
  t('.foo.bar','<div class="bar foo"></div>', 'multi classes')
  t('.foo, .bar','<div class="foo"></div><div class="bar"></div>', 'parallel classes')
  t('#someid','<div id="someid"></div>', 'id')
})

describe('combinators', function(){
  t('a > b','<a><b></b></a>', 'child')
  t('a b','<a><b></b></a>', 'ancestor')
  t('a + b','<a></a><b></b>', 'sibilings')
  t('a b + p','<a><b></b><p></p></a>', 'ancestor and sibilings')

})

describe('attributes', function(){
  t('a.foo[href=hoge]','<a class="foo" href="hoge"></a>')
  t('a.foo[href~=hoge]','<a class="foo" href="hoge"></a>')
  t('a.foo[href$=hoge]','<a class="foo" href="hoge"></a>')
  t('a.foo[href=hoge][title="fuga"]','<a class="foo" href="hoge" title="fuga"></a>')
  t('a.foo[href]','<a class="foo" href="href"></a>')
})
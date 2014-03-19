var migawari = require('./index.js')
var assert = require('assert')

var t = function(selector, html){
  it(selector, function(){
    assert.equal(migawari(selector), html)
  })
}

describe('basics', function(){
  t('a','<a></a>')
  t('*','<div></div>')
  t('.foo','<div class="foo"></div>')
  t('a.foo','<a class="foo"></a>')
  t('.foo.bar','<div class="bar foo"></div>')
  t('.foo, .bar','<div class="foo"></div><div class="bar"></div>')
  t('#someid','<div id="someid"></div>')
})
describe('combinators', function(){
  t('a > b','<a><b></b></a>')
  t('.foo .bar','<div class="foo"><div class="bar"></div></div>')
  t('a + b','<a></a><b></b>')
  t('.a .b + .c','<div class="a"><div class="b></div><div class="c"></div></div>')

})
decribe('attributes', function(){
  t('a.foo[href=hoge]','<a class="foo" href="hoge"></a>')
  t('a.foo[href~=hoge]','<a class="foo" href="hoge"></a>')
  t('a.foo[href$=hoge]','<a class="foo" href="hoge"></a>')
  t('a.foo[href=hoge][title="fuga"]','<a class="foo" href="hoge" title="fuga"></a>')
  t('a.foo[href]','<a class="foo" href="href"></a>')
  
})
var parser = require("../lib/parser")
var assert = require("assert")
describe("parser", function(){
  it("parsed", function(){
    var result = parser("a b + .c > #d .e[f='g'],.h")
    var expect =
    [ [ { combinator: ' ', tag: 'a' },
        { combinator: ' ', tag: 'b' },
        { combinator: '+',
          tag: '*',
          classes: { c: 'c' },
          classList: [ 'c' ] },
        { combinator: '>', tag: '*', id: 'd' },
        { combinator: ' ',
          tag: '*',
          classes: { e: 'e' },
          classList: [ 'e' ],
          attributes:
           [ { operator: '=',
               name: 'f',
               escapedName: 'f',
               value: 'g',
               escapedValue: 'g' } ] } ],
      [ { combinator: ' ',
          tag: '*',
          classes: { h: 'h' },
          classList: [ 'h' ] } ] ]
    //console.log(require("util").inspect(result, {depth:null}))
    assert.deepEqual(expect, result)
  })
})

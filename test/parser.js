var parser = require("../lib/parser")
var assert = require("assert")
describe("parser", function(){
  it("", function(){
    var result = parser("a b + .c > #d ~ .e[f='g'],.h")
    //console.log(require("util").inspect(result, {depth :null}))
    var expect = [ [ { tag: { type: 'tag', name: 'a' },
      combinator: { type: 'child' },
      attributes: [] },
    { tag: undefined, combinator: { type: 'child' }, attributes: [] },
    { tag: { type: 'tag', name: 'b' },
      combinator: { type: 'adjacent' },
      attributes: [] },
    { tag: undefined,
      combinator: { type: 'child' },
      attributes:
       [ { type: 'attribute',
           name: 'class',
           action: 'element',
           value: 'c',
           ignoreCase: false } ] },
    { tag: undefined,
      combinator: { type: 'adjacent' },
      attributes:
       [ { type: 'attribute',
           name: 'id',
           action: 'equals',
           value: 'd',
           ignoreCase: false } ] },
    { tag: undefined,
      combinator: { type: 'adjacent' },
      attributes: [] },
    { tag: undefined,
      combinator: undefined,
      attributes:
       [ { type: 'attribute',
           name: 'class',
           action: 'element',
           value: 'e',
           ignoreCase: false },
         { type: 'attribute',
           name: 'f',
           action: 'equals',
           value: 'g',
           ignoreCase: false } ] } ],
  [ { tag: undefined,
      combinator: undefined,
      attributes:
       [ { type: 'attribute',
           name: 'class',
           action: 'element',
           value: 'h',
           ignoreCase: false } ] } ] ]
    assert.deepEqual(result, expect)
  })
})

var parser = require("../lib/parser")
var assert = require("assert")
describe("parser", function(){
  it("", function(){
    var result = parser("a b + .c > #d ~ .e[f='g'],.h:i(j+k)")
    //console.log(require("util").inspect(result, {depth :null}))
    var expect =
  [ [ { tag: [ { type: 'tag', name: 'a' } ],
      combinator: { type: 'child' } },
    { combinator: { type: 'child' } },
    { tag: [ { type: 'tag', name: 'b' } ],
      combinator: { type: 'adjacent' } },
    { attribute:
       [ { type: 'attribute',
           name: 'class',
           action: 'element',
           value: 'c',
           ignoreCase: false } ],
      combinator: { type: 'child' } },
    { attribute:
       [ { type: 'attribute',
           name: 'id',
           action: 'equals',
           value: 'd',
           ignoreCase: false } ],
      combinator: { type: 'adjacent' } },
    { combinator: { type: 'adjacent' } },
    { attribute:
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
  [ { attribute:
       [ { type: 'attribute',
           name: 'class',
           action: 'element',
           value: 'h',
           ignoreCase: false } ],
      pseudo: [ { type: 'pseudo', name: 'i', data: 'j+k' } ] } ] ]

    assert.deepEqual(result, expect)
  })
})

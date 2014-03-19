var util = require('util')
    
var tree = require('../lib/combinator')
var mock =[
  [
    { name:"a", combinator: ' '},
    { name:"b", combinator: ' '},
    { name:"c", combinator: '+'}
  ]
]

// a
// + b
// + c
describe('', function(){
  it('', function(){
    console.log(util.inspect(
      tree(mock),
      {depth : null}
    ))

  })
})
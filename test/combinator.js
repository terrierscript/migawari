var util = require('util')
var assert = require('assert')
var tree = require('../lib/combinator')
// console.log(JSON.stringify(result, null, 2))

// a
// + b
// + c
describe('', function(){
  it('a b + c', function(){
    var mock =[
      [
        { name:"a", combinator: ' '},
        { name:"b", combinator: ' '},
        { name:"c", combinator: '+'}
      ]
    ]
    var expect = {
      children :[{
        selector : { name:"a", combinator: ' '},
        children : [
          {
            selector : { name:"b", combinator: ' '},
            children : []
          },
          {
            selector : { name:"c", combinator: '+'},
            children : []
          },
        ]
      }]
    }
    assert.deepEqual( tree(mock), expect)
  })
  it('a, b', function(){
    var mock = [
      [ { name : "a", combinator: ' ' } ],
      [ { name : "b", combinator: ' '} ]
    ]
    var expect = {
      children : [{
        selector : { name : "a", combinator: ' ' },
        children :[]
      }, {
        selector : { name : "b", combinator: ' ' },
        children :[]
      }]
    }
    assert.deepEqual( tree(mock), expect)
  })
})
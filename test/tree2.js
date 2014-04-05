var tree = require("../lib/tree2")
var parser = require("CSSWhat")
describe("", function(){
  it("", function(){
    var result = tree(parser("a > b, .c + .d"))
    console.log(
      require("util").inspect(result, {depth:null} )
    )
  })
})

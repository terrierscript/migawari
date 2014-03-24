var urls = ["https://abs.twimg.com/a/1395430344/css/t1/highline_rosetta_core.bundle.css"]
var request = require('request')
var parse = require('css').parse
var assertLib = require('./assertLib')
var flatten = require('flatten')
var glyphReplace = require('./glyph_replace')

function getSelectors(ast){
  var rules = ast.stylesheet.rules.filter(function(rule){
    return (rule.type === "rule")
  })
  var selectors = flatten(rules.map(function(rule){
    return rule.selectors
  }))
  return selectors
}
urls.forEach(function(url){
  describe(url, function(){
    it(url, function(done){
      request(url, function(e, r, css){
        var ast = parse(css)
        var selectors = getSelectors(ast)
        selectors.forEach(function(selector){
          selector = glyphReplace.replace(selector)
          //console.log(selector)
          assertLib(selector)
        })
        done()
      })
    })
  })
})
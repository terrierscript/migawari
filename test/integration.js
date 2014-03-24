var urls = ["https://abs.twimg.com/a/1395430344/css/t1/highline_rosetta_core.bundle.css",
"https://s.yimg.com/zz/combo?nn/lib/metro/g/ui/base_0.0.10.css&nn/lib/metro/g/ui/helpers_0.0.8.css&nn/lib/metro/g/ui/typography_0.0.3.css&nn/lib/metro/g/theme/default/common_0.0.37.css&nn/lib/metro/g/theme/default/desktop_0.0.107.css&nn/lib/metro/g/theme/hr_blue_0.0.16.css&nn/lib/metro/g/uiplugins/modal_service_0.0.3.css&nn/lib/metro/g/uiplugins/tooltip_service_1.0.13.css&nn/lib/metro/g/uiplugins/iframeshim_service_0.0.12.css&nn/lib/metro/g/uiplugins/menu_service_0.1.13.css&nn/lib/metro/g/uiplugins/tablite_service_desktop_0.0.15.css&nn/lib/metro/g/uicontrib/ld_renderer_0.0.14.css&nn/lib/metro/g/uiplugins/tablist_service_0.1.15.css&nn/lib/metro/g/uiplugins/tablist_default_0.1.17.css&nn/lib/metro/g/uiplugins/tablist_service_vertical_0.0.2.css&nn/lib/metro/g/uiplugins/carousel_service_0.1.20.css"]
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
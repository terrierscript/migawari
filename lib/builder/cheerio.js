var cheerio = require('cheerio')
var $ = cheerio.load("<html>")

module.exports = {
  addChild : function(parent, child){
    return parent.append(child)
  },
  build : function(selector){
    var $elm = $("<"+selector.tag+">")

    $elm.addClass(selector.classList.join(" "))

    if(selector.id){
      $elm.attr('id', selector.id)
    }

    // set attributes
    selector.attributes.forEach(function(attr){
      $elm.attr(attr.name, attr.value)
    })
    
    // set text
    $elm.text(selector.text)
    return $elm
  },
  toHTML : function($elm){
    return $elm.html()
  }
}
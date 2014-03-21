var jsdom = require('jsdom').jsdom
var document = jsdom("<html>")

  
module.exports = {
  addChild : function(parent, child){
    return parent.appendChild(child)
  },
  build : function(selector){
    // create element
    var dom = document.createElement(selector.tag)

    // set id
    dom.id = selector.id

    // set className
    dom.className = selector.classList.join(' ')

    // set attributes
    selector.attributes.forEach(function(attr){
      dom.setAttribute(attr.name, attr.value)
    })
    
    // set text
    dom.textContent = selector.text
   
    return dom
  },
  toHTML : function(dom){
    return dom.innerHTML
  }
}

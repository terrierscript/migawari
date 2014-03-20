var jsdom = require('jsdom').jsdom
var document = jsdom("<html>")

module.exports = function(tree){
  return buildDom(tree)
}

function setDomAttributes(dom, attrs){
  if(!attrs) return dom
  attrs.forEach(function(attr){
    var value = undefined
    switch(attr.operator){
      case '=':
      case '~=':
      case '$=':
      case '*=':
      case undefined:
        value = attr.value ? attr.value : attr.name
        break
    }
    if(value){
      dom.setAttribute(attr.name, value)
    }
  })
  return dom
}

function buildSingleDom(document, obj){
  // detect tag
  var tag = obj.tag
  switch(tag){
    case "*":
      tag = "div" // defalt.
      break;
  }

  // create element
  var dom = document.createElement(tag)

  // set id
  dom.id = obj.id

  // set className
  var classes = obj.classList || []
  dom.className = classes.join(' ')
  
  // set attributes
  dom = setDomAttributes(dom, obj.attributes)

  
  return dom
}

function buildDom(selectorObj){
  var container = document.createElement('div')
  var parent = container
  selectorObj.forEach(function(obj){
    var child = buildSingleDom(document, obj)
    parent.appendChild(child)
    parent = child
  })
  return container
}

//util

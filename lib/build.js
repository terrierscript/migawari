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

function _build(document, selector){
  var tag = selector.tag
  
  switch(tag){
    case "*":
      tag = "div" // TODO: custom default tag.
      break;
  }

  // create element
  var dom = document.createElement(tag)

  // set id
  dom.id = selector.id

  // set className
  var classes = selector.classList || []
  dom.className = classes.join(' ')

  // set attributes
  dom = setDomAttributes(dom, selector.attributes)
  
  return dom
}

function buildSingleDom(document, treeNode){
  // detect tag
  var dom = _build(document, treeNode.selector)
  treeNode.children.forEach(function(child){
    dom.appendChild(buildSingleDom(document, child))
  })
  //console.log(dom.outerHTML)
  
  return dom
}

function buildDom(tree){
  var container = document.createElement('div')
  var parent = container
  
  tree.children.forEach(function(obj){
    var child = buildSingleDom(document, obj)
    container.appendChild(child)
  })
  return container.innerHTML
}

//util

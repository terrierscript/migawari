//var defaults = require('defaults')
var jsdom = require('jsdom').jsdom
// global
var document = jsdom("<html>")

var parser = require('./lib/parser')
var combinator = require('./lib/combinator')

module.exports = function(selector){
  var htmls = []
  var parsed = parser(selector)
  var util = require('util')
  //parsed = combinator(parsed)
  parsed.forEach(function(selectorObj){
    htmls.push(buildDom(selectorObj).innerHTML)
  })
  return htmls.join("")
}


// DOM Builder
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

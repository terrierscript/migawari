var defaults = require('defaults')
var uniq = require('uniq')

// fix selector to tree node item.
module.exports = function(selector){
  var defaultTagName = "div" // TODO: custom default tag.
  selector = defaults(selector, {
    tag : undefined,
    id : undefined,
    classList : [],
    attributes : [],
  })
  // tag nam
  var tagName = getTagName(selector.tag)
  if(!tagName){
    tagName = defaultTagName
  }

  var classes = selector.classList.concat()
  // fix attribute
  var attribs = {}
  selector.attributes.forEach(function(attr){
    var value = getAttributeValue(attr)
    if(attr.name == "class"){
      classes.push(value)
      return undefined
    }
    attribs[attr.name] = value
  })

  if(classes.length > 0){
    attribs.class = uniq(classes).join(" ")
  }

  if(selector.id){
    attribs.id = selector.id
  }
  // result dom
  var dom = {
    // To DOM
    type : "tag",
    name : tagName,
    attribs : {},
    children : [],
    parent : null,
    prev : null,
    next : null
  }
  dom.attribs = attribs

  return dom
}

// get tag name
function getTagName(tag){
  switch(tag){
    case "*":
    case undefined:
      return undefined
    default:
      return tag
  }
}

// fixup attribute
function getAttributeValue(attr, defaultValue){
  if(defaultValue === undefined){
    defaultValue = attr.name
  }
  switch(attr.operator){
    case '=':
    case '~=':
    case '$=':
    case '*=':
    case undefined:
      return attr.value ? attr.value : defaultValue // TODO : customize
  }
}

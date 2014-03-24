var defaults = require('defaults')

// fix selector to tree node item.
module.exports = function(selector){
  selector = defaults(selector,{
    tag : undefined,
    id : undefined,
    classList : [],
    attributes : [],
    text : undefined,
  })

  // fix selector
  selector.tag = getTagName(selector.tag)
  
  // fix attribute
  var attributes = selector.attributes.map(function(attr){
    var value = getAttributeValue(attr)
    if(attr.name == "class"){
      var classes = selector.classList.concat()
      classes.push(value)
      value = classes.join(' ')
    }
    return {
      name : attr.name,
      value : value
    }
  })
  selector.attributes = attributes
  
  return selector
}

// get tag name
function getTagName(tag){
  switch(tag){
    case "*":
    case undefined:
      return "div" // TODO: custom default tag.
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
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
  selector.tag = getTagName(selector.tag)
  selector.attributes = buildAttribute(selector.attributes)
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
function getAttribute(attr){
  switch(attr.operator){
    case '=':
    case '~=':
    case '$=':
    case '*=':
    case undefined:
      return attr.value ? attr.value : attr.name // TODO : customize
  }
}

function buildAttribute(attributes){
  return attributes.map(function(attr){
    return {
      name : attr.name,
      value : getAttribute(attr)
    }
  })
}

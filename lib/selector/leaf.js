var parseAttribs = function(attributes){
  var attribs ={}
  if(attributes === undefined) return attribs
  attributes.map(function(attr){
    var value = attribs[attr.name]
    if(value){
      value += " " + attr.value
    }else{
      value = attr.value
    }
    attribs[attr.name] = value
  })
  return attribs
}

// return leaf generate function
module.exports = function(defaultTag){
  return function(selector){
    // default dom
    var dom = {
      // To DOM
      type : "tag",
      name : defaultTag || "div",
      attribs : {},
      children : [],
      parent : null,
      prev : null,
      next : null
    }
    if(!selector){
      return dom
    }
    if(selector.tag){
      dom.name = selector.tag[0].name
    }

    // set

    var attribs = parseAttribs(selector.attribute)

    dom.attribs = attribs

    return dom
  }
}

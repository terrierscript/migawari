var slick = require('slick')


module.exports = function(css){
  var parsed = slick.parse(css)
  // In Slick documentation, parse function return array.
  // but actually return object...
  parsed = objToArr(parsed)
  var array = []
  parsed.forEach(function(i){
    array.push(objToArr(i))
  })
  return array
}

function objToArr(obj){
  var arr = []
  Object.keys(obj).forEach(function(key){
    if(key === "length"){
      return
    }
    arr.push(obj[key])
  })
  return arr
  
}
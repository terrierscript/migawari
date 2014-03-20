var slick = require('slick')


module.exports = function(css){
  return toArray(slick.parse(css))
}

// In Slick documentation, parse function return array.
// but actually return object...
function toArray(selectorObject){
  selectorObject = objToArr(selectorObject)
  var array = []
  selectorObject.forEach(function(i){
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
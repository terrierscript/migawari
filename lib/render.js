var render = require('cheerio/lib/render')
var traverse = require('traverse')
module.exports = function(dom, defaultTag){
  if(defaultTag === undefined){
    defaultTag = "div"
  }
  dom = traverse(dom).map(function(x){
    if(!x || this.circular) return x
    if(x.type !== "tag") return x
    if(x.name === null){
      x.name = defaultTag
    }
    return x
  })
  return render(dom)
}

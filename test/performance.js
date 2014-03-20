
var microtime = require('microtime')
var build = require('../lib/build')
var cheerio = require('cheerio')
var stopwatch = function(block){
  var start = microtime.now()
  block()
  var end = microtime.now()
  var rap = end - start
  return rap
}
var bench = function(block, times){
  var raps = []
  for(var i = 0; i < times; i++){
    var rap = stopwatch(function(){ block() } )
    raps.push(rap)
    //console.log((i+1), rap)
  }
  return raps
}
var $ = cheerio.load("<html></html>")
var jsdom = require('jsdom').jsdom
var document = jsdom("<html></html>")


var times = 10
function cheerioBench(){
  var result = bench(function(){
    var container = $("<div>")
    var child = $("<a>")
    child.addClass("foo")
    container.append(child)
    container.attr("id", "baz")
    //console.log(container.html())
  }, times)
  console.log(result, result.reduce(function(a,b){ return a+b}))
}

function jsdomBench(){
  var result = bench(function(){
    var container = document.createElement("div")
    var child = document.createElement("a")
    child.className = "foo"
    child.id = "baz"
    
    container.appendChild(child)
    //console.log(container.innerHTML)
  }, times)

  console.log(result, result.reduce(function(a,b){return a+b}))
}

cheerioBench()
jsdomBench()

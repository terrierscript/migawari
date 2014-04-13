var migawari = require("../index")
suite("migawari", function(){
  bench("basic", function(){
    migawari("a")
  })
  bench("ancestor", function(){
    migawari("a b")
  })
  bench("child", function(){
    migawari("a > b")
  })
  bench("brother", function(){
    migawari("a + b")
  })
  bench("sibilings", function(){
    migawari("a ~ b")
  })
  bench("attr", function(){
    migawari("a[title='hoge']")
  })
  bench("class", function(){
    migawari(".cls")
  })
  bench("id", function(){
    migawari("#id")
  })
  bench("bigger", function(){
    migawari("a b + .c > .d ~ .e[f='g']")
  })
})

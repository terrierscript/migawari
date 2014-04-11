var migawari = require("../index.js")

console.log(migawari("a").toString())          // <a></a>
console.log(migawari(".c").toString())         // <div class="c"></div>
console.log(migawari("#d").toString())         // <div id="d"></div>
console.log(migawari("a[title='foo']").toString()) // <a title="foo"></a>
console.log(migawari("a > b").toString())      // <a><b></b></a>
console.log(migawari("a , b").toString())      // <a></a><b</b>
console.log(migawari("a + b").toString())      // <a></a><b</b>
console.log(migawari("a > b + .c").toString()) // <a></a><b</b>
// descendant and sibilings insert dummy
console.log(migawari("a ~ b").toString())      // <a></a><div></div><b></b>
console.log(migawari("a b").toString())        // <a><div><b</b></div></a>

# Migawari
> Create html from css query selector.

## Sample Usage

```js
var migawari = require("migawari")
console.log(migawari("a").toString())          // <a></a>
console.log(migawari(".c").toString())         // <div class="c"></div>
console.log(migawari("#d").toString())         // <div id="d"></div>
console.log(migawari("a[title='foo']").toString()) // <a title="foo"></div>
console.log(migawari("a > b").toString())      // <a><b</b></a>
console.log(migawari("a , b").toString())      // <a></a><b</b>
console.log(migawari("a + b").toString())      // <a></a><b</b>
console.log(migawari("a > b + .c").toString()) // <a></a><b</b>

// descendant and siblings insert dummy
console.log(migawari("a ~ b").toString())      // <a></a><div></div><b></b>
console.log(migawari("a b").toString())        // <a><div><b</b></div></a>
```

## API

### toString()

Output html.

### dom

Return Dom object for [htmlparser2](https://github.com/fb55/htmlparser2)
If you want customize output. You can use this.

# Migawari ![travis](https://travis-ci.org/suisho/migawari.svg)

> Create html from css query selector.

## Sample Usage

```js
var migawari = require("migawari")
console.log('a');	   //<a></a>
console.log('.c');	  //<div class="c"></div>
console.log('#d');	  //<div id="d"></div>
console.log('a[title='foo']');	//<a title="foo"></a>
console.log('a > b');	//<a><b></b></a>
console.log('a , b');	//<a></a><b></b>
console.log('a + b');	//<a></a><b></b>
console.log('a > b + .c');	//<a><b></b><div class="c"></div></a>

// descendant and siblings insert dummy
console.log('a ~ b');	//<a></a><div></div><b></b>
console.log('a b');	//<a><div><b></b></div></a>
```

## API

### toString()

Output html.

### dom

Return Dom object for [htmlparser2](https://github.com/fb55/htmlparser2)
If you want customize output. You can use this.

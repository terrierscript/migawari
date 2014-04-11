# Migawari ![travis](https://travis-ci.org/suisho/migawari.svg)

> Create html from css query selector.

## Sample Usage

```js
var migawari = require("migawari")
migawari('a');	//<a></a>
migawari('.c');	//<div class="c"></div>
migawari('#d');	//<div id="d"></div>
migawari('a[title='foo']');	//<a title="foo"></a>
migawari('a > b');	//<a><b></b></a>
migawari('a , b');	//<a></a><b></b>
migawari('a + b');	//<a></a><b></b>
migawari('a > b + .c');	//<a><b></b><div class="c"></div></a>
migawari('a ~ b');	//<a></a><div></div><b></b>
migawari('a b');	//<a><div><b></b></div></a>

```

## API

### toString()

Output html.

### dom

Return Dom object for [htmlparser2](https://github.com/fb55/htmlparser2)
If you want customize output. You can use this.

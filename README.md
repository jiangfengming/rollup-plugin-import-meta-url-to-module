# rollup-plugin-import-meta-url-to-module
Transform `new URL(..., import.meta.url)` to `import` statement. So [vite](https://vitejs.dev/) can handle it.

Input:
```js
const imgUrl = new URL('path/to/asset.png', import.meta.url);
```

Output:
```js
import __asset_png__ from "path/to/asset.png";
const imgUrl = new URL(__asset_png__, import.meta.url || document.baseURI || self.location.href);
```

If `.href` is append, the output code will be optimized:

Input:
```js
const imgUrl = new URL('path/to/asset.png', import.meta.url).href;
```

Output:
```js
import __asset_png__ from "path/to/asset.png";
const imgUrl = __asset_png__;
```

Because in Server-Side Rendering, `import.meta.url` is a `file:` protocol URL,
if the `base` option in vite config does not include protocol and origin, the `href` is usually not you want.
So we just use the imported file path.

But there is a small problem, the file path will not always be a Full URL,
it depends on the `base` option.
## Installation

```
npm i rollup-plugin-import-meta-url-to-module
```

## Usage
`vite.config.js`:

```js
import urlToModule from 'rollup-plugin-import-meta-url-to-module';

export default {
  plugins: [
    urlToModule()
  ]
};
```

Maybe it can be used in rollup alone, but I haven't tested it.

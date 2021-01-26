# rollup-plugin-import-meta-url-to-module

Input:
```js
const imgUrl = new URL('path/to/asset.png', import.meta.url);
```

Output:
```js
import __asset_png__ from "path/to/asset.png";
const imgUrl = new URL(__asset_png__, import.meta.url);
```

## Installation

```
npm i rollup-plugin-import-meta-url-to-module
```

## Usage
`rollup.config.js` or `vite.config.js`:

```js
import urlToModule from 'rollup-plugin-import-meta-url-to-module';

export default {
  plugins: [
    urlToModule()
  ]
};
```

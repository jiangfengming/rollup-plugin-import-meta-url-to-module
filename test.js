const assert = require('assert');
const urlToModule = require('./index.js');

let input, output;

input = "const imgUrl = new URL('path/to/asset.png', import.meta.url);";
output = urlToModule().transform(input, '/path/to/file');
assert.strictEqual(output.code, `import __path_to_asset_png__ from "path/to/asset.png";
const imgUrl = new URL(__path_to_asset_png__, import.meta.url || document.baseURI || self.location.href);`);

input = "const imgUrl = new URL('path/to/asset.png', import.meta.url).href;";
output = urlToModule().transform(input, '/path/to/file');
assert.strictEqual(output.code, `import __path_to_asset_png__ from "path/to/asset.png";
const imgUrl = new URL(__path_to_asset_png__, import.meta.url || document.baseURI || self.location.href).href;`);


input = "const imgUrl = new URL('path/to/asset.png', import.meta.url).href;";
output = urlToModule({ optimizeHref: true }).transform(input, '/path/to/file');
assert.strictEqual(output.code, `import __path_to_asset_png__ from "path/to/asset.png";
const imgUrl = __path_to_asset_png__;`);

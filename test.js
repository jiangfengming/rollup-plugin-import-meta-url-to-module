const assert = require('assert');
const urlToModule = require('./index.js');

const input = "const imgUrl = new URL('path/to/asset.png', import.meta.url);";
const output = urlToModule().transform(input, '/path/to/file');
assert.strictEqual(output, 'import __asset_png__ from "path/to/asset.png";\nconst imgUrl = new URL(__asset_png__);');

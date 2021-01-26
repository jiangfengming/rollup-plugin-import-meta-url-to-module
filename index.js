const path = require('path');
const { createFilter } = require('@rollup/pluginutils');

module.exports = function(options = {}) {
  const filter = createFilter( options.include, options.exclude );

  return {
    transform(code, id) {
      if (!filter(id)){
        return;
      }

      const assets = {};

      code = code.replace(/new URL\((?:'|")([^'"]+)(?:'|"),\s*import\.meta\.url\)/g, (str, pathname) => {
        if (!assets[pathname]) {
          assets[pathname] = '__' + path.basename(pathname).replace(/\W/g, '_') + '__';
        }

        return assets[pathname];
      });

      if (Object.keys(assets).length) {
        code = Object.entries(assets)
          .map(([pathname, varName]) => `import ${varName} from "${pathname}";`)
          .join('\n') + '\n' + code;
      }

      return code;
    }
  };
};

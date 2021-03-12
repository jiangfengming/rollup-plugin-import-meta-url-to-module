const { createFilter } = require('@rollup/pluginutils');
const MagicString = require('magic-string');

module.exports = function({ include, exclude, optimizeHref = false } = {}) {
  const filter = createFilter(include, exclude);

  return {
    transform(code, id) {
      if (!filter(id)) {
        return;
      }

      const matches = [...code.matchAll(/new URL\((?:'|")([^'"]+)(?:'|"),\s*import\.meta\.url\)(\.href)?/g)];

      if (matches.length) {
        const s = new MagicString(code);
        const imported = [];

        for (const match of matches) {
          const start = match.index;
          const [str, pathname, href = ''] = match;
          const varName = '__' + pathname.replace(/\W/g, '_') + '__';

          if (!imported[varName]) {
            s.prepend(`import ${varName} from "${pathname}";\n`);
            imported[varName] = true;
          }

          s.overwrite(
            start,
            start + str.length,
            href && optimizeHref
              ? varName
              : `new URL(${varName}, import.meta.url || document.baseURI || self.location.href)${href}`
          );
        }

        return {
          code: s.toString(),
          map: s.generateMap({ source: id })
        }
      } else {
        return;
      }
    }
  };
};

var globby = require('globby');
var paramCase = require('param-case')
var path = require('path');

var paths = globby.sync('./**/main.ts');

var pageNames = paths.map(value => {
    var folder = path.basename(path.dirname(value));
    return paramCase(folder);
});

var newPages = {};
pageNames.forEach((pageName, index) => {
    newPages[pageName] = {
        entry: paths[index]
    };
});

console.log('newPages');
console.log(newPages);

var pages = {
    'feature-one': {
        entry: paths[0]
    },
    'feature-two': {
        entry: paths[1]
    }
};

console.log('pages');
console.log(pages);
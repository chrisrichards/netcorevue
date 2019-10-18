var globby = require('globby');
var paramCase = require('param-case');
var path = require('path');

var paths = globby.sync('./**/main.ts');

var pageNames = paths.map(value => {
    var folder = path.basename(path.dirname(value));
    return paramCase(folder);
});

var pages = {};
pageNames.forEach((pageName, index) => {
    pages[pageName] = {
        entry: paths[index]
    };
});

module.exports = {
    pages: pages,
    outputDir: "wwwroot/",
    filenameHashing: false,
    // delete HTML related webpack plugins
    chainWebpack: config => {
        for (var page in pages) {
            config.plugins.delete('html-' + page);
            config.plugins.delete('preload-' + page);
            config.plugins.delete('prefetch-' + page);
        }
    }
};
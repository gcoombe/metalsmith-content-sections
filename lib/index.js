var cheerio = require('cheerio');
var extname = require('path').extname;

module.exports = plugin;

function plugin(options) {
    if ('string' == typeof options) {
        options = { selectors: [options] };
    }
    options = options || {};
    var titleSelector = options.titleSelector || 'h2';

    return function(files, metalsmith, done){
        setImmediate(done);
        Object.keys(files).forEach(function(file){
            if ('.html' != extname(file)) return;
            var data = files[file];
            var contents = data.contents.toString();
            var $ = cheerio.load(contents);
            data.contentSections = [];

            $(titleSelector).each(function() {
                var content = "";
                $(this).nextUntil(titleSelector).each(function () {
                    content += $.html($(this));
                });
                data.contentSections.push({
                    title: $(this).text(),
                    content: content
                });
            });
        });
    };
}
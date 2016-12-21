var assert = require('assert');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var sections = require('..');

describe('metalsmith-headings', function(){
    it('should parse sections', function(done){
        Metalsmith('test/fixtures')
            .use(markdown())
            .use(sections({ titleSelector: 'h2' }))
            .build(function(err, files){
                if (err) return done(err);
                assert.deepEqual(files['index.html'].contentSections, [
                    { title: 'Header', content: "<p>content</p><p>more content</p>" },
                    { title: 'Next header', content: "" }
                ]);
                done();
            });
    });

    it('accepts shorthand selector', function(done){
        Metalsmith('test/fixtures')
            .use(markdown())
            .use(sections('h2'))
            .build(function(err, files){
                if (err) return done(err);
                assert.deepEqual(files['index.html'].contentSections, [
                    { title: 'Header', content: "<p>content</p><p>more content</p>" },
                    { title: 'Next header', content: "" }
                ]);
                done();
            });
    });
});
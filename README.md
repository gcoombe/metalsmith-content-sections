# metalsmith-content-sections

## Installation

    $ npm install metalsmith-content-sections
    
## Usage 

```js
var Metalsmith = require('metalsmith');
var sections = require('metalsmith-content-sections');

Metalsmith(__dirname)
  .use(sections('h2'))
  .build();
```

## Complete example (creating section accordions)

**javascript**
```js
var Metalsmith = require('metalsmith');
var sections = require('metalsmith-content-sections');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');

Metalsmith(__dirname)
  .source('./resources')
  .destination('./build')
  .use(markdown())
  .use(layouts({
    engine: 'handlebars',
    pattern: "**/*.html"
  }))
  .use(inplace({
    engine: 'handlebars',
    pattern: "**/*.html"
  }))
  .use(sections("h2"));
```

**Markdown**
```
## Header
Content

##Next header
More content
```

**Handlebars template**
```html
<ul class="accordion" data-accordion>
  {{#each contentSections }}
  <li class="accordion-item" data-accordion-item>
    <a href="#" class="accordion-title">{{title}}</a>
    <div class="accordion-content" data-tab-content>
      {{content}}
    </div>
  </li>
  {{/each}}
</ul>
```

**Built html**
```html
<ul class="accordion" data-accordion>
  <li class="accordion-item" data-accordion-item>
    <a href="#" class="accordion-title">Header</a>
    <div class="accordion-content" data-tab-content>
      <p>Content</p>
    </div>
  </li>
  
  <li class="accordion-item" data-accordion-item>
    <a href="#" class="accordion-title">Next header</a>
    <div class="accordion-content" data-tab-content>
      <p>More content</p>
    </div>
  </li>
</ul>
```

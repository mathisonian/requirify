# npm-exists 

check if a library exists on npm

[![Build Status](https://secure.travis-ci.org/parroit/npm-exists.png?branch=master)](http://travis-ci.org/parroit/npm-exists)

[![NPM version](https://badge-me.herokuapp.com/api/npm/npm-exists.png)](http://badges.enytc.com/for/npm/npm-exists) 

## Getting Started
Install the module with: `npm install npm-exists --save`

```javascript
var exists = require('npm-exists');
exists('request').then(function(moduleExists){
    if (moduleExists) {
        console.log('already registered');
    } else {
        console.log('gosh, request name already taken!');
    }
});
```

## License

The MIT License

Copyright (c) 2014, Andrea Parodi

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
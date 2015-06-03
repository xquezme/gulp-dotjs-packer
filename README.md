#gulp-dotjs-packer

> Compile [doTjs](https://github.com/olado/doT) with gulp (gulpjs.com)

## Information

<table>
<tr>
<td>Package</td><td>gulp-dotjs-packer</td>
</tr>
<tr>
<td>Description</td>
<td>doTjs compiler for Gulp</td>
</tr>
<tr>
<td>Gulp Version</td>
<td>3.x</td>
</tr>
</table>

## Usage

```javascript
var gulp = require("gulp");
var dotPacker = require("gulp-dotjs-packer");

gulp.task('dot', function() {
  gulp.src('./lib/*.jst')
	.pipe(dotPacker({
      fileName: "templates.js"
    }))
    .pipe(gulp.dest('./dist/'))
});
```

## Options

- `fileName`

	Name of output file

- `wrap`

    Add a wrapper to be around the output file

    examples:

    [default] - Adds UMD wrapper around the output file
    ```
        dotPacker({
            wrap: true
            ...
        });
    ```

    Disable wrapping
    ```
        dotPacker({
            wrap: false
            ...
        });
    ```

    Custom start and end wrapper
    ```
        dotPacker({
            wrap: {
                start: "(function() {\r\n",
                end: "\r\n}())"
                ...
            }
        });
    ```

- `variable`

	Name of variable to store templates.

- `templateSettings`

	doT.js template settings.

- `processName (pathName, base, cwd)`

	Function that replace template name.

## LICENSE

MIT License

Copyright (c) 2014 Pimenov Sergey pimenov.sergei@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

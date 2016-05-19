

<!-- Start parsing/licenseBlock.js -->

## extractLicenseHeaderFromString(string, isComment, callback)

Tries to read a license comment block at the top of a source string.

### Example:
```javascript
var license = require('license-toolkit');
var fs = require('fs');

var filePath = 'source-file.js';
var contents = fs.readFileSync(filePath).toString();

var language = license.languageOfFileAtPath(filePath);
var isComment = license.commentParserForLanguage(language);
license.extractLicenseHeaderFromString(contents, isComment, function (error, licenseHeader) {
    if (!error) {
        console.log(licenseHeader);
    } else {
        throw error;
    }
});
```

`source-file.js`
```javascript
//
// Copyright (c) Some Author YEAR
// Some more license text here.
// THIS IS NOT AN ACTUAL LICENSE DECLARATION
//

var variable = 'value';
// ...
```

`Output`
```
//
// Copyright (c) Some Author YEAR
// Some more license text here.
// THIS IS NOT AN ACTUAL LICENSE DECLARATION
//

```

### Params:

* **String** *string* The string to read the header from.
* **Function** *isComment* A function that returns true if the text starts with a comment, otherwise false.
* **Function** *callback* A callback that is called on completion. 

If there is no license header in the string, then the callback is called
with an instance of `Error` as it's first argument.

If the license header could be successfully read, then the callback is called with
`null` as the first argument and a string with the actual header in the second argument.

## commentParserForLanguage(language)

Returns a function that checks for a comment in the specified language.

### Example:
```javascript
var license = require('license-toolkit');
var isComment = license.commentParserForLanguage('javascript');

var lines = [
    '// This is a comment',
    'This is not a comment',
    'var variable; // This is not a comment'
];

lines.forEach(function (line) {
    console.log(line + ' = ' + isComment(line));
});
```

`Output`
```
// This is a comment = true
This is not a comment = false
var variable; // This is not a comment = false
```

### Params:

* **String** *language* The language to evaluate the comments for as given by languageOfFileAtPath.

### Return:

* A parser matching the language if found, otherwise null.

## languageOfFileAtPath(path)

Returns a string identifying the language of a file at a given file path.

### Example:
```javascript
var license = require('license-toolkit');

var paths = [
    'path/to/source.js',
    'source.js',
    '.js'
];

paths.forEach(function (path) {
    console.log(path + ' = ' + license.languageOfFileAtPath(path));
});
```

`Output`
```
path/to/source.js = javascript
source.js = javascript
.js = javascript
```

### Params:

* **String** *path* A path to the file to evaluate the language for.

### Return:

* **String** A language matching the file at path if found, otherwise null.

<!-- End parsing/licenseBlock.js -->


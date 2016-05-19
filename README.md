
# license-toolkit
A collection of tools for dealing with software licenses.

## Introduction
With license-toolkit you can list, update, change and insert licenses into your
open source software projects.

The tools consists of a command-line interface and a Javascript module.

## Installation
You can install license-toolkit through npm:

```
npm install license-toolkit
```

## Javascript API
You can find the documentation for the Javascript API [here](generated/api-documentation.md).

## Command-line usage

```
Usage:

    license <command>

Commands:

    extract-header <file-path>          Extracts the license header from a file.
```

#### extract-header
Tries to read a license comment block at the top of a file.

Reads the file at file-path and looks at the top of the file for a license
header. If one is found, it is printed and the exit code is 0.

If any error occurred the exit code is non-zero.

**Example:**

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

`Command`
```
$ license extract-header source-file.js
//
// Copyright (c) Some Author YEAR
// Some more license text here.
// THIS IS NOT AN ACTUAL LICENSE DECLARATION
//

$ echo $?
0
```

## Copyright
license-toolkit - A collection of tools for dealing with software licenses.

Written in 2016 by Jesper Oskarsson jesosk@gmail.com

To the extent possible under law, the author(s) have dedicated all copyright
and related and neighboring rights to this software to the public domain worldwide.
This software is distributed without any warranty.

You should have received a copy of the CC0 Public Domain Dedication along with this software.
If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.

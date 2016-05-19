
// license-toolkit - A collection of tools for dealing with software licenses.
// Written in 2016 by Jesper Oskarsson jesosk@gmail.com
//
// To the extent possible under law, the author(s) have dedicated all copyright
// and related and neighboring rights to this software to the public domain worldwide.
// This software is distributed without any warranty.
//
// You should have received a copy of the CC0 Public Domain Dedication along with this software.
// If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.

/**
 * Tries to read a license comment block at the top of a source string.
 *
 * ### Example:
 * ```javascript
 * var license = require('license-toolkit');
 * var fs = require('fs');
 *
 * var filePath = 'source-file.js';
 * var contents = fs.readFileSync(filePath).toString();
 *
 * var language = license.languageOfFileAtPath(filePath);
 * var isComment = license.commentParserForLanguage(language);
 * license.extractLicenseHeaderFromString(contents, isComment, function (error, licenseHeader) {
 *     if (!error) {
 *         console.log(licenseHeader);
 *     } else {
 *         throw error;
 *     }
 * });
 * ```
 *
 * `source-file.js`
 * ```javascript
 * //
 * // Copyright (c) Some Author YEAR
 * // Some more license text here.
 * // THIS IS NOT AN ACTUAL LICENSE DECLARATION
 * //
 *
 * var variable = 'value';
 * // ...
 * ```
 *
 * `Output`
 * ```
 * //
 * // Copyright (c) Some Author YEAR
 * // Some more license text here.
 * // THIS IS NOT AN ACTUAL LICENSE DECLARATION
 * //
 *
 * ```
 *
 * @param {String} string The string to read the header from.
 * @param {Function} isComment A function that returns true if the text starts with a comment, otherwise false.
 * @param {Function} callback A callback that is called on completion.
 *
 *
 * If there is no license header in the string, then the callback is called
 * with an instance of `Error` as it's first argument.
 *
 * If the license header could be successfully read, then the callback is called with
 * `null` as the first argument and a string with the actual header in the second argument.
 *
 */
var extractLicenseHeaderFromString = function (string, isComment, callback) {
    var lines = string.split(/\r?\n/g);
    var header = [];

    for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        var line = lines[lineIndex];

        if (isComment(line) || line.length === 0) {
            header.push(line);
        } else {
            break;
        }
    }

    var headerString = header.join('\n');

    if (mentionsLicenseOrCopyright(headerString)) {
        return callback(null, headerString);
    } else {
        return callback(new Error('String does not contain a license header'));
    }
};
module.exports.extractLicenseHeaderFromString = extractLicenseHeaderFromString;

var mentionsLicenseOrCopyright = function (string) {
    return string.match(/copyright/g) || string.match(/Copyright/g) || string.match(/license/g) || string.match(/License/g);
};

/**
 * Returns a function that checks for a comment in the specified language.
 *
 * ### Example:
 * ```javascript
 * var license = require('license-toolkit');
 * var isComment = license.commentParserForLanguage('javascript');
 *
 * var lines = [
 *     '// This is a comment',
 *     'This is not a comment',
 *     'var variable; // This is not a comment'
 * ];
 *
 * lines.forEach(function (line) {
 *     console.log(line + ' = ' + isComment(line));
 * });
 * ```
 *
 * `Output`
 * ```
 * // This is a comment = true
 * This is not a comment = false
 * var variable; // This is not a comment = false
 * ```
 *
 * @param {String} language The language to evaluate the comments for as given by languageOfFileAtPath.
 * @return A parser matching the language if found, otherwise null.
 *
 */
var commentParserForLanguage = function (language) {
    if (language === 'javascript') {
        return function (line) {
            return line.match(/^\/\//) !== null;
        };
    }
    return null;
};
module.exports.commentParserForLanguage = commentParserForLanguage;

/**
 * Returns a string identifying the language of a file at a given file path.
 *
 * ### Example:
 * ```javascript
 * var license = require('license-toolkit');
 *
 * var paths = [
 *     'path/to/source.js',
 *     'source.js',
 *     '.js'
 * ];
 *
 * paths.forEach(function (path) {
 *     console.log(path + ' = ' + license.languageOfFileAtPath(path));
 * });
 * ```
 *
 * `Output`
 * ```
 * path/to/source.js = javascript
 * source.js = javascript
 * .js = javascript
 * ```
 *
 * @param {String} path A path to the file to evaluate the language for.
 * @return {String} A language matching the file at path if found, otherwise null.
 *
 */
var languageOfFileAtPath = function (path) {
    if (path.match(/\.js$/)) {
        return 'javascript';
    }
    return null;
};
module.exports.languageOfFileAtPath = languageOfFileAtPath;

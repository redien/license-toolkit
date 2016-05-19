
// license-toolkit - A collection of tools for dealing with software licenses.
// Written in 2016 by Jesper Oskarsson jesosk@gmail.com
//
// To the extent possible under law, the author(s) have dedicated all copyright
// and related and neighboring rights to this software to the public domain worldwide.
// This software is distributed without any warranty.
//
// You should have received a copy of the CC0 Public Domain Dedication along with this software.
// If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.

var fs = require('fs');
var license = require('../module/main');

var command = process.argv[2];

if (command === undefined) {
    process.stdout.write(
    '\n' +
    'Usage:\n' +
    '\n' +
    '    license <command>\n' +
    '\n' +
    'Commands:\n' +
    '\n' +
    '    extract-header <file-path>          Extracts the license header from a file.\n' +
    '\n'
    );
    process.exit(0);
}

var filePath = process.argv[3];

fs.stat(filePath, function (error, stats) {
    if (!error && stats.isFile()) {
        var contents = fs.readFileSync(filePath).toString();
        var language = license.languageOfFileAtPath(filePath);
        var isComment = license.commentParserForLanguage(language);
        license.extractLicenseHeaderFromString(contents, isComment, function (error, licenseHeader) {
            if (!error) {
                process.stdout.write(licenseHeader);
            } else {
                throw new Error('The file does not contain a license header!');
            }
        });
    } else {
        throw new Error('The given file could not be found!');
    }
});

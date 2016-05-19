
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
var should = require('should');
var license = require('./licenseBlock');

var isComment = function (string) {
    return string.match(/^\/\//) !== null;
};

var stringShouldReturnLicense = function (string, expected, done) {
    license.extractLicenseHeaderFromString(string, isComment, function (error, header) {
        should(error).be.null()
        header.should.equal(expected);
        done();
    });
};

describe('licenseBlock.extractLicenseHeaderFromString', function () {
    it('should return an error given an empty string', function (done) {
        var string = '';
        license.extractLicenseHeaderFromString(string, isComment, function (error) {
            error.message.should.match(/String does not contain a license header/);
            done();
        });
    });

    it('should return a single comment line given it contains the word "copyright"', function (done) {
        var license = '// copyright';
        var string = license;
        stringShouldReturnLicense(string, license, done);
    });

    it('should return a single comment line given it contains the word "Copyright"', function (done) {
        var license = '// Copyright';
        var string = license;
        stringShouldReturnLicense(string, license, done);
    });

    it('should return a single comment line given it contains the word "license"', function (done) {
        var license = '// license';
        var string = license;
        stringShouldReturnLicense(string, license, done);
    });

    it('should return a single comment line given it contains the word "License"', function (done) {
        var license = '// License';
        var string = license;
        stringShouldReturnLicense(string, license, done);
    });

    it('should not return any lines not beginning with a comment', function (done) {
        var license = '// License';
        var string = license + '\nvar license = "abc";';
        stringShouldReturnLicense(string, license, done);
    });

    it('should return several lines given one mentions copyright or license', function (done) {
        var license = '// License\n// More text...';
        var string = license + '\nvar license = "abc";';
        stringShouldReturnLicense(string, license, done);
    });

    it('should return several lines separated by empty lines', function (done) {
        var license = '// License\n\n\n// More text...';
        var string = license + '\nvar license = "abc";';
        stringShouldReturnLicense(string, license, done);
    });

    it('should only read comments at the start of the file', function (done) {
        var license = '// License';
        var string = license + '\nvar license = "abc";\n// More text...';
        stringShouldReturnLicense(string, license, done);
    });
});

describe('licenseBlock.commentParserForLanguage', function () {
    it('should return null when no parser is found for a given language', function () {
        var language = 'some-unrecognized-language';
        should(license.commentParserForLanguage(language)).be.null();
    });

    it('should return a function that parses Javascript comments given a "javascript" as a language', function () {
        var language = 'javascript';
        var comment = '// Comment';
        var commentAfterCode = 'var variable; // Comment';
        var notComment = 'Not comment';
        var isComment = license.commentParserForLanguage(language);

        isComment(comment).should.be.true();
        isComment(commentAfterCode).should.be.false();
        isComment(notComment).should.be.false();
    });
});

describe('languageOfFileAtPath', function () {
    it('should return null when the language cannot be determined', function () {
        var path = 'unrecognizable-path';
        should(license.languageOfFileAtPath(path)).be.null();
    });

    it('should return "javascript" given a path to a .js file', function () {
        var path = 'path/to/source.js';
        license.languageOfFileAtPath(path).should.equal('javascript');

        path = 'source.js';
        license.languageOfFileAtPath(path).should.equal('javascript');

        path = '.js';
        license.languageOfFileAtPath(path).should.equal('javascript');
    });
});

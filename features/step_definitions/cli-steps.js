
// license-toolkit - A collection of tools for dealing with software licenses.
// Written in 2016 by Jesper Oskarsson jesosk@gmail.com
//
// To the extent possible under law, the author(s) have dedicated all copyright
// and related and neighboring rights to this software to the public domain worldwide.
// This software is distributed without any warranty.
//
// You should have received a copy of the CC0 Public Domain Dedication along with this software.
// If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.

var should = require('should');
var Promise = require('promise');

var exec = function (command, options) {
    options = options || {};

    return new Promise(function (resolve, reject) {
        require('child_process').exec(command, options, function (error, stdout, stderr) {
            if (error) {
                error.stdout = stdout;
                error.stderr = stderr;
                reject(error);
            } else {
                resolve({
                    stdout: stdout,
                    stderr: stderr
                });
            }
        });
    });
};

var executeLicenseCommand = function (world, command) {
    var command = 'bin/license ' + command;
    return exec(command).then(function (result) {
        world.result = result;
    }, function (error) {
        error.stderr = command + '\n\n' + error.stderr;
        world.result = error;
    });
};

module.exports = function () {
    this.Given(/^a file that does not exist$/, function () {
        this.filePath = 'some-file-that-does-not-exist.js';
    });

    this.Given(/^a file without license information$/, function () {
        this.filePath = 'features/example_files/no-license-information.js';
    });

    this.Given(/^the example file '([^\']+)'$/, function (exampleFile) {
        this.filePath = 'features/example_files/' + exampleFile;
    });

    this.When(/^I try to extract the license header$/, function () {
        return executeLicenseCommand(this, 'extract-header ' + this.filePath);
    });

    this.When(/^I call the command-line with no arguments$/, function () {
        return executeLicenseCommand(this, '');
    });

    this.Then(/^I should get an error saying:$/, function (error) {
        this.result.should.be.an.instanceOf(Error);
        this.result.stderr.should.containEql(error);
    });

    this.Then(/^I should get exactly:$/, function (contents) {
        this.result.should.not.be.an.instanceOf(Error);
        this.result.stdout.should.equal(contents);
    });
};

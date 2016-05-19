
# license-toolkit - A collection of tools for dealing with software licenses.
# Written in 2016 by Jesper Oskarsson jesosk@gmail.com
#
# To the extent possible under law, the author(s) have dedicated all copyright
# and related and neighboring rights to this software to the public domain worldwide.
# This software is distributed without any warranty.
#
# You should have received a copy of the CC0 Public Domain Dedication along with this software.
# If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.

Feature: Extract license header
    As a user of license-toolkit
    I want to extract a license header from a file
    So that I can read, update and reuse it.

    Scenario: File not found
        Given a file that does not exist
        When I try to extract the license header
        Then I should get an error saying:
        """
        The given file could not be found!
        """

    Scenario: License header not found in file
        Given a file without license information
        When I try to extract the license header
        Then I should get an error saying:
        """
        The file does not contain a license header!
        """

    Scenario: Javascript file with license header
        Given the example file 'with-license-header.js'
        When I try to extract the license header
        Then I should get exactly:
        """

        //
        // Copyright (c) Some Author YEAR
        // Some more license text here.
        // THIS IS NOT AN ACTUAL LICENSE DECLARATION
        //

        """

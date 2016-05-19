
# license-toolkit - A collection of tools for dealing with software licenses.
# Written in 2016 by Jesper Oskarsson jesosk@gmail.com
#
# To the extent possible under law, the author(s) have dedicated all copyright
# and related and neighboring rights to this software to the public domain worldwide.
# This software is distributed without any warranty.
#
# You should have received a copy of the CC0 Public Domain Dedication along with this software.
# If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.

Feature: Help text
    As a user of license-toolkit
    I want to get help information
    So that I can use the tools

    @command-line
    Scenario: Command-line called with no arguments
        When I call the command-line with no arguments
        Then I should get exactly:
        """

        Usage:

            license <command>

        Commands:

            extract-header <file-path>          Extracts the license header from a file.


        """

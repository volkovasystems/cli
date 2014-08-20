/*:
	@module-license:
		The MIT License (MIT)

		Copyright (c) 2014 Richeve Siodina Bebedor

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"packageName": "cli",
			"fileName": "cli.js",
			"moduleName": "cli",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/cli.git",
			"testCase": "cli-test.js",
			"isGlobal": true
		}
	@end-module-configuration

	@module-documentation:

	@end-module-documentation

	@include:
		{			
			"readline@nodejs": "readline",
			"fs@nodejs": "fs"
		}
	@end-include
*/
var cli = function cli( promptString, workingDirectory ){
	/*:
		@meta-configuration:
			{
				"promptString:required": "string",
				"workingDirectory:optional": "string"
			}
		@end-meta-configuration
	*/

	var commandInterface = readline.createInterface( {
		"input": process.stdin,
		"output": process.stdout
	} );

	commandInterface.setPrompt( promptString );

	commandInterface.prompt( );

	commandInterface.on( "line",
		function onLine( line ){
			line = line.trim( );

		} );

	commandInterface.on( "close",
		function onClose( ){

		} );
};

var readline = require( "readline" );
var fs = require( "fs" );

module.exports = cli;
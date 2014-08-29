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
			"fs@nodejs": "fs",
			"path@nodejs": "path"
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

    var containingDirectory = module.filename.split( path.sep ).reverse( ).slice( 2 ).reverse( ).join( path.sep );

    if( typeof workingDirectory == "string" &&
        !fs.existsSync( workingDirectory ) )
    {
        console.warn( "given working directory is not existing" );
        console.warn( "using the containing directory instead" );

        workingDirectory = containingDirectory;
    }

    if( workingDirectory === containingDirectory &&
        !fs.existsSync( containingDirectory ) )
    {
        var error = new Error( "fatal:containing directory is not existing" );
        console.error( error );
        throw error;
    }

    if( typeof workingDirectory == "undefined" &&
        !fs.existsSync( containingDirectory ) )
    {
        workingDirectory = containingDirectory;
    }

    //: By changing the working directory to where the commands are then we can reference the command properly without necessary inline configurations.
    process.chdir( workingDirectory );

    var directoryList = fs.readdirSync( workingDirectory );

    var directoryPath = null;
    var cliInterpreterList = [ ];
    var cliInterpreterNamespace = null;
    var cliInterpreterEngineFilePath = null;

    var directoryListLength = directoryList.length;
    for( var index = 0; index < directoryListLength; index++ ){
        directoryPath = directoryList[ index ];

        if( fs.statSync( directoryPath ).isDirectory( ) &&
            CLI_INTERPRETER_NAMESPACE_PATTERN.test( directoryPath ) )
        {
            cliInterpreterNamespace = directoryPath.match( CLI_INTERPRETER_NAMESPACE_PATTERN )[ 0 ];
            cliInterpreterEngineFilePath = [ directoryPath, cliInterpreterNamespace + ".js" ].join( path.sep );
            cliInterpreterList.push( cliInterpreterEngineFilePath );
        }
    }

    var cliInterpreterEngineSet = { };
    var cliInterpreterEngineNamespace = null;

    var cliInterpreterListLength = cliInterpreterList.length;
    for( var index = 0; index < cliInterpreterListLength; index++ ){
        cliInterpreterEngineFilePath = cliInterpreterList[ index ];

        cliInterpreterEngineNamespace = cliInterpreterEngineFilePath.split( ".js" )[ 0 ].match( CLI_INTERPRETER_NAMESPACE_PATTERN )[ 1 ];

        if( fs.existsSync( cliInterpreterEngineFilePath ) &&
            fs.statSync( cliInterpreterEngineFilePath).isFile( ) )
        {
            try{
                cliInterpreterEngineSet[ cliInterpreterEngineNamespace ] = require( cliInterpreterEngineFilePath );

            }catch( error ){
                console.warn( "error encountered during CLI interpreter engine inclusion" );
                console.warn( "please check each CLI interpreter module for possible cause of error" );
                console.error( error );
            }
        }
    }

	var commandInterface = readline.createInterface( {
		"input": process.stdin,
		"output": process.stdout
	} );

    var promptStringList = [ promptString, " " ];

	commandInterface.setPrompt( promptStringList.join( "" ) );

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
var path = require( "path" );

const CLI_INTERPRETER_NAMESPACE_PATTERN = /cli-((?:[a-z][a-z0-9]*-?)*[a-z][a-z0-9]*)$/;

module.exports = cli;
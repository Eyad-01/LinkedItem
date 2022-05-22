var Connection = require( 'tedious' ).Connection;
var config = {
    server: 'linkeditem.database.windows.net', //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'admin-Eyad', //update me
            password: 'Linked-item' //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'linkeditem' //update me
    }
};
var connection = new Connection( config );
connection.on( 'connect', function ( err ) {
    // If no error, then good to proceed.  
    console.log( "Connected" );
    executeStatement1();
} );

connection.connect();

var Request = require( 'tedious' ).Request


function executeStatement1() {
    request = new Request( "SELECT TOP (1000) * FROM [dbo].[Category]", function ( err ) {
        if ( err ) {
            console.log( err );
        }
    } );
    request.on( 'row', function ( columns ) {
        columns.forEach( function ( column ) {
            if ( column.value === null ) {
                console.log( 'NULL' );
            } else {
                console.log( "Product id of inserted item is " + column.value );
            }
        } );
    } );

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on( "requestCompleted", function ( rowCount, more ) {
        connection.close();
    } );
    connection.execSql( request );
}
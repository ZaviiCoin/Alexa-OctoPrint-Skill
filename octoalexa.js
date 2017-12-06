exports.handler = function( event, context ) {

    var http = require( 'http' );

    var url = 'Your OctoPrint API Key Goes here!';

    http.get( url, function( response ) {

        var data = '';

        response.on( 'data', function( x ) { data += x; } );

        response.on( 'end', function() {

            var json = JSON.parse( data );

            var text = 'Your 3D Print has ';
            text+=json.printTimeLeft+" Minutes Remaining";
            output( text, context );

        } );

    } );

};

function output( text, context ) {

    var response = {
        outputSpeech: {
            type: "PlainText",
            text: text
        },
        card: {
            type: "Simple",
            title: "OctoPrint Print Time Remaining",
            content: text
        },
        shouldEndSession: true
    };

    context.succeed( { response: response } );

}
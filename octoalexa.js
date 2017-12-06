exports.handler = function( event, context ) {

    var http = require( 'http' );

    var url = 'http://Your_IP/api/job?apikey=YourAPIKEY';

    http.get( url, function( response ) {

        var data = '';

        response.on( 'data', function( x ) { data += x; } );

        response.on( 'end', function() {

            var json = JSON.parse( data );
            var hours = Math.floor(json.progress.printTimeLeft / 3600);
            var minutes = Math.floor(json.progress.printTimeLeft / 60) % 60
            var seconds = Math.floor(json.progress.printTimeLeft % 60);
            var text = 'Your 3D Print has ';
            text+=hours+" Hours ";
            text+=minutes+" Minutes and ";
            text+=seconds+" Seconds Remaining ";
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

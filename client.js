
/*jshint esversion: 6 */
const net = require('net');

let url = process.argv[2].replace('/', ' ');
let uri = '/' + url.split(' ')[1];
let http = 'GET ' + uri + ' HTTP/1.1';

var client = net.createConnection(8080, 'localhost', () => {
  client.setEncoding('utf8');
  client.write(http);

  client.on('data', function( data ) {
    process.stdout.write(data);

    client.end();

  });

});

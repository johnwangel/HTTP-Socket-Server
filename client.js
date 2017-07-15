
/*jshint esversion: 6 */
const net = require('net');

let url = process.argv[2].replace('/', ' ');
let uri = '/' + url.split(' ')[1];
let http = 'HEAD ' + uri + ' HTTP/1.1';

var client = net.createConnection(8080, 'localhost', () => {
  client.setEncoding('utf8');
  client.write(http);

  client.on('data', function( data ) {
    let newdata = removeHeader(String(data));
    process.stdout.write(newdata);
    client.end();
  });
});

function removeHeader( data ){
  let nohead;
  let noheadArray = data.split('\n\n');
  nohead
  if (noheadArray.length > 1){
    nohead = noheadArray.join('\n\n');
  } else {
    nohead = noheadArray[0];
  }

  return nohead;
}

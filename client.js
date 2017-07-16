
/*jshint esversion: 6 */
const net = require('net');
const fs = require('fs');

if (process.argv.length < 4 ) {
  process.stdout.write(`.~^~HELP~^~.
    --argument 3 - must be a url and uri
    --argument 4 (optional) - request method [GET, HEAD]
    `);
  return;
}

//GET REQUEST METHOD
let method = 'GET';
if (process.argv[3]) {
  method = process.argv[3];
}

let url = process.argv[2].replace('/', ' ');
let uri = '/' + url.split(' ')[1];
let http = `${method} ${uri} HTTP/1.1\r\n`;
var now = new Date();
http += 'Date : ' + now.toUTCString() + '\r\n';
http += 'Host : ' + url + '\r\n';
http += 'User-Agent: Johnny Angel HTTP Client';

var client = net.createConnection(8080, 'localhost', () => {
  client.setEncoding('utf8');
  client.write(http);

  client.on('data', function( data ) {
    switch (method){
      case 'GET':
        let newdata = removeHeader(String(data));
        data = newdata[1];
        writeToFile(newdata[0]);
        break;
      case 'HEAD':
        writeToFile(data);
        break;
      default:
        break;
    }

    client.end();
  });
});

function removeHeader( data ){
  let body;
  let dataArray = data.split('\n\n');
  let header = dataArray.shift();
  if (dataArray.length > 1){
    body = dataArray.join('\n\n');
  } else {
    body = dataArray[0];
  }
  return [ header, body ];
}

function writeToFile( data ) {
  console.log(data);
  let datestr = new Date().getTime();
  let filename = `header_${datestr}.txt`;

  //set date to an array containing each line.
  let firstlineArray = data.split('\n');
  let lineArray = firstlineArray.filter( obj => {
    if ( obj !== '') { return obj; }
  });
  let firstLine = lineArray[0].split(' ');
  let method = firstLine[0];
  let uri = firstLine[1];
  let http = firstLine[2];

  let propertiesStr = '';


  for (var i = 1; i < lineArray.length; i++) {
    console.log(lineArray);
    let splitLine = lineArray[i].split(':');
    let property = splitLine.shift().trim();
    let value = '';
    console.log(splitLine);
    if (splitLine.length > 1){
      value = splitLine.join(':').trim();
    } else {
      console.log(splitLine[0]);
      value = splitLine[0].trim();
    }
    propertiesStr += `${property} : '${value}'`;
    if (i !== lineArray.length -1){ propertiesStr += `,\n         `;}
  }
  console.log(propertiesStr);

  //start  string
  let jsonFile = `{
    header : {
         method : '${method}',
         uri : '${uri}',
         http : '${http}',`;

  jsonFile += propertiesStr;

  jsonFile += `   }
  }`;

  fs.writeFile(filename, jsonFile, (err) => {
    if (err) throw err;
    console.log('The header data has been saved!');
  });

}
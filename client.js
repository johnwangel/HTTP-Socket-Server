
/*jshint esversion: 6 */
const net = require('net');
const fs = require('fs');

if (process.argv.length < 3 ) {
  process.stdout.write(`.~^~HELP~^~.
    --argument 3 - must be a url and uri
    --argument 4 (optional) - request method [GET, HEAD]
    --argument 5+ (optional)
      /h - Display header instead of content body
      /p:0000 - specify port, where 0000 is the port number
    `);
  return;
}

//GET REQUEST METHOD
let method = 'GET';
let port = 80;

if (process.argv[3]) {
  method = process.argv[3];
}

if (process.argv.length > 4) {
  for (var opts = 4; opts < process.argv.length; opts++) {
    let opt = process.argv[opts];
    if (opt.includes('\h')){
      method = 'HEAD';
    } else if (opt.includes('\p')){
      port = Number(opt.split(':')[1]);
    }
  }
}

let urlarr = process.argv[2].replace('/', ' ');

//GET URL / PORT
let urlandport = urlarr.split(' ')[0];
let url = '';
if (urlandport.includes(':')){
  url = urlandport.split(':')[0];
  port = Number(urlandport.split(':')[1]);
} else {
  url = urlandport;
}

let uri = '/' + urlarr.split(' ')[1];

let http = `${method} ${uri} HTTP/1.1`;
console.log(http);
// var now = new Date();
// http += 'Date : ' + now.toUTCString() + '\r\n';
// http += 'Host : ' + url + '\r\n';
// http += 'User-Agent: Johnny Angel HTTP Client\n';

var client = net.createConnection(port, url, () => {
  client.setEncoding('utf8');

  let res = '';

  client.on('data', function( data ) {
    res += data;
  });

  client.on('error', e => {
    console.error(`problem with request: ${e.message}`);
  });

  client.on('end', () => {
    if (res === '' || res === undefined ){
      console.log('Got nothing');
      return;
    } else {
      console.log(res);
    }

    switch (method){
      case 'GET':
        let newdata = removeHeader(String(res));
        res = newdata[1];
        writeToFile(newdata[0]);
        break;
      case 'HEAD':
        writeToFile(res);
        break;
      default:
        break;
    }

    } );
});
client.write(http);
client.end();

function removeHeader( data ){
  let body;
  let dataArray = [];
  if (data.includes('\r\n')){
      dataArray = data.split('\r\n\r\n');
  } else if (data.includes('\r')) {
      dataArray = data.split('\r\r');
  } else if (data.includes('\n')) {
      dataArray = data.split('\n\n');
  }

  let header = dataArray.shift();
  if (dataArray.length > 1){
    body = dataArray.join('\n\n');
  } else {
    body = dataArray[0];
  }
  return [ header, body ];
}

function writeToFile( data ) {
  let datestr = new Date().getTime();
  let filename = `header_${datestr}.txt`;

  //set date to an array containing each line.
  let firstlineArray = [];
  if (data.includes('\r\n')){
    firstlineArray = data.split('\r\n');
  }  else if (data.includes('\r')){
    firstlineArray = data.split('\r');
  } else if (data.includes('\n')){
    firstlineArray = data.split('\n');
  }

  let lineArray = firstlineArray.filter( obj => {
    if ( obj !== '' && obj !== undefined && obj !== null ) { return obj; }
  });
  let firstLine = lineArray[0].split(' ');
  let method = firstLine[0];
  let uri = firstLine[1];
  firstLine.shift();
  firstLine.shift();
  let http = firstLine.join(' ');

  let propertiesStr = '';

  for (var i = 1; i < lineArray.length; i++) {
    let splitLine = lineArray[i].split(':');
    let property = splitLine.shift().trim();
    let value = '';
    if (splitLine.length > 1){
      value = splitLine.join(':').trim();
    } else {
      value = splitLine[0].trim();
    }
    propertiesStr += `${property} : '${value}'`;
    if (i !== lineArray.length -1){ propertiesStr += `,\n         `;}
  }

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

  if (Number(uri) !== 200 ){
    process.stdin.write(`You got error ${uri}: ${http}\n\n`);
  }

}
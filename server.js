/*jshint esversion: 6 */
const net = require('net');

var server = net.createServer( function ( request ) {

  //LISTENER FOR THE CONNECTION
  request.on('data', data => {
    let data2 = data.toString('utf8');
    let dataSort = data2.split('\r\n');
    let methodArray = dataSort[0].split(' ');
    let method = methodArray[0];
    let uri = methodArray[1];
    let http = methodArray[2];
    if (method = 'GET') {
      request.write(String(getResponse(uri)));

    } else if (method = 'POST') {
      console.log('this is a post request');

    } else if (method = 'PUT') {
      console.log('this is a put request');
    }




    //data = String(data).replace(/\r?\n|\r/, '');

    // //DEFAULT IF THIS IS NOT FIRST MESSAGE FROM USER.
    // if (handle === false){
    //   for (let connections in serverArray){
    //     if ( userName !== serverArray[connections].name) {
    //       serverArray[connections].socket.write(`[${userName}] ${data}`);
    //     }
    //   }
    // }

    request.end();
  });

  //CONNECTION HAS CLOSED
//   connection.on('end', ( packet ) => {
//     let i = 0;
//     for (let connections in serverArray){
//       if ( userName === serverArray[connections].name) {
//         serverArray.splice(i, 1);
//         for (let connections in serverArray){
//           serverArray[connections].socket.write(`[ADMIN] ${userName} abandoned us!`);
//         }
//       }
//       i++;
//     }
//   });
});

server.listen({ port: 8080, address: 'localhost' });

// //ADMIN BROADCAST
// process.stdin.on('data', data  => {
//   data = String(data).replace( /\r?\n|\r/, '');
//   if (data.indexOf('\\kick') !== -1) {
//     if (data.includes(':')){
//       removePort( data.split(':')[1] );
//       data = `User ${data.split(':')[1]} has been ousted!`;
//     } else {
//       let idx = checkForUser( data.split(' ')[1] );
//       if ( idx > -1 ) {
//         removeUser( user, idx );
//         data = `${user} has been ousted!`;
//       } else {
//         console.log('That user does not exist.');
//         return;
//       }
//     }
//   }

//   for (let connections in serverArray){
//     serverArray[connections].socket.write(`[ADMIN] ${data}`);
//   }
// });

function getResponse(uri){
  let response = `HTTP/1.1 200 OK\n\n`;

  switch (uri) {
    case '/helium.html':
      return response += heText();
    case '/hydrogen.html':
      return response += hText();
    case '/index.html':
      return response += idxText();
    case '/styles.css':
      return response += styText();
    default:
      return notFound();
  }
}

function heliumText() {
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>The Elements - Hydrogen</title>
              <link rel="stylesheet" href="/css/styles.css">
            </head>
            <body>
              <h1>Hydrogen</h1>
              <h2>H</h2>
              <h3>Atomic number 1</h3>
              <p>Hydrogen is a chemical element with chemical symbol H and atomic number 1. With an atomic weight of 1.00794 u, hydrogen is the lightest element on the periodic table. Its monatomic form (H) is the most abundant chemical substance in the universe, constituting roughly 75% of all baryonic mass. Non-remnant stars are mainly composed of hydrogen in its plasma state. The most common isotope of hydrogen, termed protium (name rarely used, symbol 1H), has a single proton and zero neutrons.</p>
              <p><a href="/">back</a></p>
            </body>
            </html>`;
}

function hText(){
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>The Elements - Hydrogen</title>
              <link rel="stylesheet" href="/css/styles.css">
            </head>
            <body>
              <h1>Hydrogen</h1>
              <h2>H</h2>
              <h3>Atomic number 1</h3>
              <p>Hydrogen is a chemical element with chemical symbol H and atomic number 1. With an atomic weight of 1.00794 u, hydrogen is the lightest element on the periodic table. Its monatomic form (H) is the most abundant chemical substance in the universe, constituting roughly 75% of all baryonic mass. Non-remnant stars are mainly composed of hydrogen in its plasma state. The most common isotope of hydrogen, termed protium (name rarely used, symbol 1H), has a single proton and zero neutrons.</p>
              <p><a href="/">back</a></p>
            </body>
            </html>`;
}

function idxText(){
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>The Elements</title>
              <link rel="stylesheet" href="/css/styles.css">
            </head>
            <body>
              <h1>The Elements</h1>
              <h2>These are all the known elements.</h2>
              <h3>These are 2</h3>
              <ol>
                <li>
                  <a href="/hydrogen.html">Hydrogen</a>
                </li>
                <li>
                  <a href="/helium.html">Helium</a>
                </li>
              </ol>
            </body>
            </html>`;
}

function styText(){
  return `@import url(http://fonts.googleapis.com/css?family=Open+Sans|Roboto+Slab);

            /* http://meyerweb.com/eric/tools/css/reset/
               v2.0 | 20110126
               License: none (public domain)
            */

            html, body, div, span, applet, object, iframe,
            h1, h2, h3, h4, h5, h6, p, blockquote, pre,
            a, abbr, acronym, address, big, cite, code,
            del, dfn, em, img, ins, kbd, q, s, samp,
            small, strike, strong, sub, sup, tt, var,
            b, u, i, center,
            dl, dt, dd, ol, ul, li,
            fieldset, form, label, legend,
            table, caption, tbody, tfoot, thead, tr, th, td,
            article, aside, canvas, details, embed,
            figure, figcaption, footer, header, hgroup,
            menu, nav, output, ruby, section, summary,
            time, mark, audio, video {
              margin: 0;
              padding: 0;
              border: 0;
              font-size: 100%;
              font: inherit;
              vertical-align: baseline;
            }
            /* HTML5 display-role reset for older browsers */
            article, aside, details, figcaption, figure,
            footer, header, hgroup, menu, nav, section {
              display: block;
            }
            body {
              line-height: 1;
            }
            ol, ul {
              list-style: none;
            }
            blockquote, q {
              quotes: none;
            }
            blockquote:before, blockquote:after,
            q:before, q:after {
              content: '';
              content: none;
            }
            table {
              border-collapse: collapse;
              border-spacing: 0;
            }

            /* STYLES */

            body{
              background-color: #3F3F4E;
              font-family: 'Open Sans', 'Helvetica', sans-serif;
              padding: 50px;
              max-width: 500px;
              margin: auto;
            }

            h1, h2, h3, h4, h5, h6{
              font-family: 'Roboto Slab', 'Helvetica', sans-serif;
              color: #B4D12B;
              margin-bottom: 20px;
            }

            h1{
              font-size: 50px;
              line-height: 55px;
            }

            h2{
              font-size: 30px;
              line-height: 38px;
              color: #879642;
            }

            h3{
              font-size: 25px;
              line-height: 30px;
              color: #F2FFC1;
            }

            p{
              color: #C6C5AC;
              font-family: 'Open Sans', 'Helvetica', sans-serif;
              line-height: 26px;
              font-size: 15px;
            }

            ul{

            }

            li{
              line-height: 26px;
              font-size: 15px;
            }

            a{
              color: #F2FFC1;
              text-decoration: none;
              border-bottom: 1px dashed #E3DE8B;
            }

            a:hover{
              color: #C6C5AC;
              border-bottom: 1px dashed #C6C5AC;
            }`;
}

function notFound(){
 return `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Element not found!</title>
            <link rel="stylesheet" href="/css/styles.css">
          </head>
          <body>
            <h1>404</h1>
            <h2>Element not found!</h2>
            <p>
              <a href="/">back</a>
            </p>
          </body>
          </html>`;
}


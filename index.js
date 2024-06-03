const express = require('express');
const path = require('path');
require('dotenv').config();

//! DB Config
require('./src/database/config').dbConnection();

//! App de Express
const app = express();

//! Lectura y parseo del Body
app.use(express.json());

//! Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./src/sockets/socket');




//! Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );


//! Rutas
app.use( '/api/login', require('./src/routes/auth') );
app.use( '/api/users', require('./src/routes/users') );
app.use( '/api/messages', require('./src/routes/messages') );


server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});



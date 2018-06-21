//console.log("hello wolrd");

const path = require('path');
const express = require('express');
const app = express();

const SocketIO = require('socket.io');

//SocketIO.listen(server);
//SocketIO(server);

// config
app.set('port', process.env.PORT || 3000);

//static files
//console.log('');
app.use(express.static(path.join(__dirname, 'app')));

//start server
const server = app.listen(app.get('port'), () => {
	console.log('server on port', app.get('port'));
});

//websocket
const io = SocketIO(server);

// conexión nueva
io.on('connection', (socket) => {
	console.log('usuario ', socket.id, ' conectado.');
	
	socket.on('chatsend:message', (data) => {
		io.sockets.emit('chatget:message', data);
		//console.log(data);
	});
	
	socket.on('chat:writing', (dato) => {
		socket.broadcast.emit('chat:writing', dato);
		console.log(dato);
	});
//	
});
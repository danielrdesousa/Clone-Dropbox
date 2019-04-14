const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connect', socket => {
	socket.on('connectRoom', box => {
		socket.join(box);
	})
});

mongoose.connect(
	'mongodb+srv://danielrdesousa:2205Drs@goweek-vuymw.mongodb.net/myDB?retryWrites=true', {
		useNewUrlParser: true,
	}
);

app.use((req, res, next) => {
	req.io = io;

	return next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));
app.use(require('./routes'));

server.listen(3333);
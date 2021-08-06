const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 7777;

var ROOMS = [];

app.use(express.static('__dirname'));
app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'/index.html'));
});
server.listen(port,()=>{
	console.log("LISTENING...");
});

io.on('connection',(socket)=>{
	const sendRoomList = () =>{
		if(ROOMS.length !== 0){
			for(var i = 0; i<ROOMS.length; i++){
				socket.emit("eachRoom",(ROOMS[i]));
			}
		}
	}
	console.log("connected");
	sendRoomList();
	socket.on('disconnect',()=>{
		console.log("Disconnected");	
	});
	socket.on('listRooms',()=>{sendRoomList()});
	socket.on("joinRoom",(Q)=>{
		if(!ROOMS.includes(Q.r)){
			ROOMS.push(Q.r);
			socket.join(Q.r);
			socket.emit("created");  
			io.emit("newRoom",(Q.r));
		}
		else{
			socket.join(Q.r);
			ROOMS = ROOMS.filter(thisRoom => thisRoom !== Q.r);
			socket.to(Q.r).emit("joined",(Q.n));
			socket.emit("prepare");
		}
	});
	socket.on("myName",(Q)=>{socket.to(Q.r).emit("OppoName",(Q.n));
		console.log("sent name");
	});
	socket.on("attack",(room)=>{socket.to(room).emit("attack")});
	socket.on("defense",(room)=>{socket.to(room).emit("defense")});
	socket.on("noDefense",(room)=>{socket.to(room).emit("noDefense")});
	socket.on("left",(room)=>{socket.to(room).emit("left")});
	socket.on("endLeft",(room)=>{socket.to(room).emit("endLeft")});
	socket.on("right",(room)=>{socket.to(room).emit("right")});
	socket.on("endRight",(room)=>{socket.to(room).emit("endRight")});



});


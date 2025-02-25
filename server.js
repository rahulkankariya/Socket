
const http = require("http");
require('dotenv').config()
const v1 = require('./api/routes/v1/v1')
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => {
  // console.log("Connection==>",socket)
  socket.on("user-message", (message) => {
    console.log('Message==>',message)
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));
app.use('/api/v1',v1)

app.get("/", (req, res) => {
//   return res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log(`Server Started at PORT:9000`));
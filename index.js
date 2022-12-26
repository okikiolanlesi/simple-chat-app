const express = require("express");
const morgan = require("morgan");
const socket = require("socket.io");
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes

const server = app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
const io = socket(server);

io.on("connection", (socket) => {
  console.log("New user connected");
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
  socket.on("not typing", (data) => {
    socket.broadcast.emit("not typing", data);
  });
});

import { Server } from "socket.io";

export default function handler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("new-message", (msg) => {
      socket.broadcast.emit("receive-message", msg);
    });
  });

  res.end();
}

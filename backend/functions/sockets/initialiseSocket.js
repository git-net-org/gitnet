import { Server } from "socket.io";
import { socketEventHandlers } from "../socketHandler.js";


export const initializeSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New socket connected: ", socket.id);
    socketEventHandlers(socket, io);
  });

  console.log("Socket.IO server initialized");
  return io;
};

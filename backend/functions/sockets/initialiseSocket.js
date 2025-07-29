import { Server } from "socket.io";
import { socketEventHandlers } from "../socketHandler.js";


let io;
export const initializeSocketServer = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
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
export const getSocketInstance = () => io

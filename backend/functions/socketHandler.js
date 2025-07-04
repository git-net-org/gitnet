import { saveMessageToDB } from "./sockets/socketHelpers/saveMessagetoDB.js";

export const socketEventHandlers = (socket, io) => {

 socket.on("send_message", async (data) => {
   console.log("Received message:", data);
   const res = await saveMessageToDB({ ...data });
   socket.emit("message_saved", res);
 });

 socket.on('disconnect', () => {
    console.log('Socket disconnected: ', socket.id);
  });

}
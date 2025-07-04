import {create} from 'zustand'
import { SocketStore } from "../types/schemaTypes";
import { getSocket } from "@/utils/socket";

export const useSocketStore = create<SocketStore>((set)=> ({
  socket:null,  
  socketId:null,

    createSocketConnection: ()=> {
      
  const sock = getSocket();
      set({ socket: sock });
      sock.connect();
      sock.on("connect", () => {
        set({ socketId: sock.id });
        console.log("Socket connected:", sock.id);
      });
    },

    disconnectSocketConnection: ()=> {
        const sock = getSocket();
        sock.disconnect();
        set({ socket: null, socketId: null });
        console.log("Socket disconnected.");
    }
}))
import axios from "axios";
import { ChatMessage } from "../../types/schemaTypes";

export const populateMessages = async(set:any,connectionId:string)=>{

    try {
          const res = await axios.get(`http://localhost:5000/messages/${connectionId}`,{
        withCredentials: true,
        headers: {
          "x-csrf-token": document.cookie.split("=")[1].split(";")[0],
        },});
        console.log("messages from populatemessage",res.data)
          const data: ChatMessage[] =  res.data;
          set((state:any) => ({
            message: {
              ...state.message,
              [connectionId]: data,
            },
          }));
        } catch (err) {
          console.error("Failed to fetch messages:", err);
        }
}
import axios from "axios";
import { ChatMessage } from "../../types/schemaTypes";

export const populateMessages = async(set:any,connectionId:string)=>{

    try {
          // Get csrfToken from cookies
          const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift();
            return null;
          };

          const csrfToken = getCookie('csrfToken');

          const res = await axios.get(`http://localhost:5000/messages/${connectionId}`,{
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfToken,
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
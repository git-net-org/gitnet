import { ChatMessage } from "../../types/schemaTypes"

export const setMessageData = (set:any, msg:ChatMessage)=>{
  console.log("from setMessageData", msg)
    set((state:any) => ({
      message: {
        ...state.message,
        [msg.connectionId]: [
          ...(state.message[msg.connectionId] || []),
          msg,
        ],
      },
    }))

}
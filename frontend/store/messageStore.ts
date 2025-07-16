import { create } from "zustand";
import { ChatMessage, MessageStore } from "../types/schemaTypes";
import { setMessageData } from "../functions/messgae/setMessageData";
import { populateMessages } from "../functions/messgae/populateMessages";

export const useMessageStore = create<MessageStore>((set) => ({
  message: {},

  setMessage: (msg: ChatMessage) => setMessageData(set, msg),

  populateMessage: async (connectionId: string) => populateMessages(set,connectionId)
}));
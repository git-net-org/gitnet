import { create } from "zustand";

interface ActiveChatStore {
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
}

export const useActiveChat = create<ActiveChatStore>((set) => ({
  activeChatId: null,
  setActiveChatId: (id) => set({ activeChatId: id }),
}));

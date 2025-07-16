import { create } from "zustand";

interface IncomingCall {
  callerId: string;
  receiverId: string; 
  callerPeerId: string;
  callType: 'video' | 'audio';
}

interface VideoCallState {
  isCallModalOpen: boolean;
  receiverId: string | null;
  incomingCall: IncomingCall | null;
  initiateCall: (receiverId: string) => void;
  setIncomingCall: (call: IncomingCall | null) => void;
  closeCallModal: () => void;
  clearCall: () => void;
}

export const useVideoCallStore = create<VideoCallState>((set) => ({
  isCallModalOpen: false,
  receiverId: null,
  incomingCall: null,
  
  initiateCall: (receiverId: string) => 
    set({ isCallModalOpen: true, receiverId, incomingCall: null }),
  
  setIncomingCall: (call: IncomingCall | null) =>
    set({ incomingCall: call, isCallModalOpen: !!call }),
  
  closeCallModal: () =>
    set({ isCallModalOpen: false, receiverId: null }),
  
  clearCall: () =>
    set({ isCallModalOpen: false, receiverId: null, incomingCall: null }),
}));

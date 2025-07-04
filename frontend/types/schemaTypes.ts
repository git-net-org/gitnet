import { Socket } from "socket.io-client";

export interface IUser {
  id: string;
  githubId: string;
  username: string;
  avatar: string;
  email: string;
  createdAt: string;
}
export interface IUserData {
  user: IUser | null,
  isLoading: boolean 
}
export interface IUserActions{
  setUserData: ()=>void,
  setLoading: (isLoading:boolean)=>void,
}

export interface IConnection {
  id: string;
  userId: string;         // initiator
  connectionId: string;   // the person who was followed

  user?: IUser;         
  connectedUser?: IUser;  
  isMutual? : boolean;
}

export interface IConnectionsStore {
  connections: IConnection[];
  isLoading:boolean;
  setConnections: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  refreshConnection: () => Promise<void>;
}

export interface IMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  sentAt: string; // or Date
  sender?: IUser;
  receiver?: IUser;
}

export interface SocketStore {
  socket: Socket | null;
  socketId: string | null;
  createSocketConnection: () => void;
  disconnectSocketConnection: () => void;
}

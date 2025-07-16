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
  userId?: string;         // initiator
  connectedUserId?: string;   // the person who was followed
  connectionId:string;
  isConversationInvited: boolean,
  isPlatformInvited:boolean,

  isMutual : boolean;
  isFollower:boolean;
  isFollowing: boolean;
  
  allowed?:boolean;

  invitedBy?:string,
  connectedAt:Date,
  connectionStatus:string,
  createdAt:Date,
  user: IUser;         
  connectedUser: IUser;  
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

export interface ChatMessage {
  senderId: string;
  content: string;
  connectionId: string;  
  receiverId: string;  
  sentAt?: Date;
}

export interface MessageStore {
  message:Record<string, ChatMessage[]>;
  setMessage: (message:ChatMessage)=>void; //to update message stae onm frontend
  populateMessage: (connectionId: string)=>Promise<void> //to get messages from db, connection id
}
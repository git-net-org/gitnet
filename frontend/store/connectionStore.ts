import { create } from "zustand";
import { IConnection,  IConnectionsStore} from "../types/schemaTypes";
import { populateConnections, refreshConnection } from "../actions/connectionActions";

const connections : IConnection[]= [{
    id: "",
      userId: "",
      connectionId: ""  
}]
export const useConnection = create<IConnectionsStore>((set) => ({
  connections,
  isLoading:false,
  setConnections: ()=>populateConnections(set),
  setLoading: (loading: boolean) => set({isLoading:loading}),
  refreshConnection: ()=>refreshConnection(set)
}))
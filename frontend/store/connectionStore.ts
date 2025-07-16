import { create } from "zustand";
import { IConnection,  IConnectionsStore} from "../types/schemaTypes";
import { populateConnections, refreshConnection } from "../actions/connectionActions";

export const useConnection = create<IConnectionsStore>((set) => ({
  connections: [],
  isLoading:false,
  setConnections: ()=>populateConnections(set),
  setLoading: (loading: boolean) => set({isLoading:loading}),
  refreshConnection: ()=>refreshConnection(set)
}))
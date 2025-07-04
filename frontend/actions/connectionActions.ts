import { getConnectionData } from "../functions/connection/getConnectionData";
import { getrefreshConnection } from "../functions/connection/refreshConnection";

export const populateConnections = async(set:any)=>{
 set({isLoading:true})
 const data = await getConnectionData();
 set({connections:data, isLoading: false})
}

export const refreshConnection = async (set:any)=>{
 set({isLoading:true})
 const data = await getrefreshConnection();
 set({connections:data, isLoading: false})
}
import { getConnectionData } from "../functions/connection/getConnectionData";
import { getrefreshConnection } from "../functions/connection/refreshConnection";

export const populateConnections = async(set:any)=>{
 set({isLoading:true})
 try {
   const data = await getConnectionData();
   set({connections:data, isLoading: false})
 } catch (error) {
   console.error('Error populating connections:', error);
   set({isLoading: false})
 }
}

export const refreshConnection = async (set:any)=>{
 set({isLoading:true})
 try {
   const data = await getrefreshConnection();
   set({connections:data, isLoading: false})
 } catch (error) {
   console.error('Error refreshing connections:', error);
   set({isLoading: false})
 }
}
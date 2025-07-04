import { getUserData } from "../functions/user/getUserData";

export const populateUserDetails = async(set:any)=>{
set({isLoading:true});
const data = await getUserData();
set({user:data, isLoading:false}); 
}


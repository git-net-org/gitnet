import {create} from 'zustand'
import { IUserData, IUserActions } from '../types/schemaTypes'
import { populateUserDetails } from '../actions/userActions'

const userData : IUserData ={
    user: null,
    isLoading: false
}

export const useUser = create<IUserActions & IUserData>((set)=>({
    ...userData,
    setUserData: ()=> populateUserDetails(set),
    setLoading: (isLoading:boolean)=>set({isLoading})
}))
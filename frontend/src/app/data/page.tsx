"use client"
import React, { useEffect } from 'react'
import { useUser } from '../../../store/userStore'
import { useConnection } from '../../../store/connectionStore';
const page = () => {
    const {user, setLoading, setUserData}= useUser();
    const {connections, setConnections} = useConnection()
    useEffect(()=>{
        setUserData();
        setConnections()
    },[])
    console.log(user)
    console.log("connections", connections)
  return (
    <div>{user ? user.username ?? "hi" : "hi"}
    
    </div>
  )
}

export default page

//  connections  
// Array [ {…} ]
// ​
// 0: Object { id: "034ee32e-a3f7-4910-8445-acee09d36237", userId: "b215c181-1cdb-4e70-b7ad-b6040b88ebad", connectionId: "f442bb6e-f275-4205-8652-41a553fd5ba2", … }
// ​​
// connectedUser: Object { id: "f442bb6e-f275-4205-8652-41a553fd5ba2", username: "shreyashaw05", avatar: "https://avatars.githubusercontent.com/u/141901560?v=4" }
// ​​
// connectionId: "f442bb6e-f275-4205-8652-41a553fd5ba2"
// ​​
// id: "034ee32e-a3f7-4910-8445-acee09d36237"
// ​​
// user: Object { id: "b215c181-1cdb-4e70-b7ad-b6040b88ebad", username: "DevDhruba3", avatar: "https://avatars.githubusercontent.com/u/190134612?v=4" }
// ​​
// userId: "b215c181-1cdb-4e70-b7ad-b6040b88ebad"
// ​​
// <prototype>: Object { … }
// ​
// length: 1
// ​
// <prototype>: Array []
// data:1:596

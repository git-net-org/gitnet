import axios from "axios";

export const getConnectionData = async()=>{
    const contacts = await axios.get("http://localhost:5000/user/get-contacts", {
        withCredentials: true,
        headers: {
          "x-csrf-token": document.cookie.split("=")[1].split(";")[0],
        },
      });
      console.log("from getConnectionsFunction:", contacts.data)
      return contacts.data.connections
}
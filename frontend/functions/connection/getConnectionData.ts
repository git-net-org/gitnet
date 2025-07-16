import axios from "axios";

export const getConnectionData = async()=>{
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const csrfToken = getCookie('csrfToken');

    const contacts = await axios.get("http://localhost:5000/user/get-contacts", {
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfToken,
        },
      });
      console.log("from getConnectionsFunction:", contacts.data)
      return contacts.data.connections
}
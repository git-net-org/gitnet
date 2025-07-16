import axios from "axios";

export const FetchButton = () => {

const refreshContacts = async ()=>{
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const csrfToken = getCookie('csrfToken');

    const contacts = await axios.get("http://localhost:5000/user/refresh-contacts", {
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfToken,
        },
      });
}

    return (
        <button className="bg-green-950 p-4 rounded-xl" onClick={()=>refreshContacts}>
            Refresh
        </button>
    )
}
import axios from "axios";

export const FetchButton = () => {

const refreshContacts = async ()=>{
    const contacts = await axios.get("http://localhost:5000/user/refresh-contacts", {
        withCredentials: true,
        headers: {
          "x-csrf-token": document.cookie.split("=")[1].split(";")[0],
        },
      });
}

    return (
        <button className="bg-green-950 p-4 rounded-xl" onClick={refreshContacts}>
            Refresh
        </button>
    )
}
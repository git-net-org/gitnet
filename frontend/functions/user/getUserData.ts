import axios from "axios";

export const getUserData = async()=>{
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const csrfToken = getCookie('csrfToken');

    const userResonse = await axios.get("http://localhost:5000/user/get-user", {
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfToken,
        },
      });
      console.log("from getUserdata",userResonse.data.user);
      return userResonse.data.user;
}
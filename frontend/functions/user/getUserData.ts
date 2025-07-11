import axios from "axios";

export const getUserData = async()=>{
    const user = await axios.get("http://localhost:5000/user/get-user", {
        withCredentials: true,
        headers: {
          "x-csrf-token": document.cookie.split("=")[1].split(";")[0],
        },
      });
      console.log("from getUserdata",user.data);
      return user.data;
}
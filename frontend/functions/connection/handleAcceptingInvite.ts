import axios from "axios";

export const helpAcceptingInvite = async (connectionId: string) => {
  try {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const csrfToken = getCookie('csrfToken');

    const res = await axios(`http://localhost:5000/user/accept-invite/${connectionId}`, {
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfToken,
        },
      }
);

    const data =res.data;

    if (res.status) {
      console.log(" Invite accepted:", data);
      return res.status
    } else {
      console.warn(" Failed to accept invite:", data.error);
    }
  } catch (err) {
    console.error(" Error while accepting invite:", err);
  }
};

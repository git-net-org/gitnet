import axios from "axios";

export const helpAcceptingInvite = async (connectionId: string) => {
  try {
    const res = await axios(`http://localhost:5000/user/accept-invite/${connectionId}`, {
        withCredentials: true,
        headers: {
          "x-csrf-token": document.cookie.split("=")[1].split(";")[0],
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

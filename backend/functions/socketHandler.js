import { PrismaClient } from "../generated/prisma/index.js";

import { saveMessageToDB } from "./sockets/socketHelpers/saveMessagetoDB.js";

let userSocketMap = new Map();
const typingTimeouts = new Map();
const callTimeouts = new Map(); // Track active call timeouts

export const getUserSocketMap = () => userSocketMap;

export const socketEventHandlers = (socket, io) => {
  
  const prisma = new PrismaClient();
  socket.on("register", ({userId, tabId})=>{

    const existing = userSocketMap.get(userId);

    if(existing && existing.tabId !== tabId)
    {
      socket.emit("multiple_tab_blocked");
      socket.disconnect();
      return;
    }
    userSocketMap.set(userId, { tabId, socketId: socket.id });
    console.log("Current map:", userSocketMap);
  })

 socket.on("send_message", async (data) => {
   console.log("Receiver message:", data.receiverId);
   const res = await saveMessageToDB({ ...data });
   const receiver = userSocketMap.get(data.receiverId);

   if (receiver) {
     io.to(receiver.socketId).emit("message_received", {
       ...data,
       connectionId: data.connectionId,
     });
   }
 });

socket.on("invitation_sent", async (data) => {
  console.log(" Invite received via socket:", data);

  const { connectionId, invitedBy, receiverId } = data;

  if (!connectionId || !invitedBy) {
    console.error("Missing data fields in invitation_sent event");
    return;
  }

  try {
    await prisma.filteredConnections.update({
      where: { id: connectionId },
      data: {
        invitedBy,
        isConversationInvited: true,
      },
    });
    console.log("FilteredConnection updated successfully for invite");
    
    socket.emit("invitation_sent_success", { connectionId });
    
    if (receiverId) {
      const receiver = userSocketMap.get(receiverId);
      if (receiver) {
        io.to(receiver.socketId).emit("invitation_received", { connectionId });
      }
    }
  } catch (err) {
    console.error("Error updating FilteredConnection:", err);
    socket.emit("invitation_sent_error", { error: err.message });
  }
});



socket.on("typing", (data) => {
  console.log("Typing event received:", data);
  const { userID, receiverID } = data;
  
  if (!userID || !receiverID) {
    console.error("Missing userID or receiverID in typing event");
    return;
  }
  
  const receiver = userSocketMap.get(receiverID);
  
  if (receiver) {
    // Send typing indicator to receiver
    io.to(receiver.socketId).emit("user_typing", { 
      userID, 
      isTyping: true,
      receiverID 
    });
    
    // Clear existing timeout for this user-receiver pair
    const typingKey = `${userID}-${receiverID}`;
    if (typingTimeouts.has(typingKey)) {
      clearTimeout(typingTimeouts.get(typingKey));
    }
    
    // Set auto-stop timeout (3 seconds)
    const timeout = setTimeout(() => {
      io.to(receiver.socketId).emit("user_typing", { 
        userID, 
        isTyping: false,
        receiverID 
      });
      typingTimeouts.delete(typingKey);
    }, 3000);
    
    typingTimeouts.set(typingKey, timeout);
  }
});

socket.on("stop_typing", (data) => {
  console.log("Stop typing event received:", data);
  const { userID, receiverID } = data;
  
  if (!userID || !receiverID) {
    console.error("Missing userID or receiverID in stop_typing event");
    return;
  }
  
  const receiver = userSocketMap.get(receiverID);
  
  if (receiver) {
    io.to(receiver.socketId).emit("user_typing", { 
      userID, 
      isTyping: false,
      receiverID 
    });
    
    // Clear the timeout since user manually stopped typing
    const typingKey = `${userID}-${receiverID}`;
    if (typingTimeouts.has(typingKey)) {
      clearTimeout(typingTimeouts.get(typingKey));
      typingTimeouts.delete(typingKey);
    }
  }
});

// Video call signaling events
  socket.on("initiate_call", (data) => {
    console.log("Call initiated:", data);
    const { callerId, receiverId, callerPeerId, callType } = data;
    
    if (!callerId || !receiverId || !callerPeerId) {
      console.error("Missing required fields for call initiation");
      return;
    }
    
    const receiver = userSocketMap.get(receiverId);
    
    if (receiver) {
      console.log("Receiver found:", receiver);
      io.to(receiver.socketId).emit("incoming_call", {
        callerId,
        callerPeerId,
        callType,
        receiverId,
      });

      // Set up timeout for unanswered call
      const callKey = `${callerId}-${receiverId}`;
      const timeoutId = setTimeout(() => {
        console.log("Call timed out - no response received");
        
        // Send timeout to caller
        socket.emit("timed_out", {
          callerId,
          callerPeerId,
          callType,
          receiverId,
        });
        
        // Send timeout to receiver as well
        io.to(receiver.socketId).emit("timed_out", {
          callerId,
          callerPeerId,
          callType,
          receiverId,
        });
        
        // Clean up timeout
        callTimeouts.delete(callKey);
      }, 2000);
      
      // Store timeout ID for potential cleanup
      callTimeouts.set(callKey, timeoutId);
      
    } else {
      socket.emit("call_failed", { reason: "User not online" });
    }
  });

  socket.on("accept_call", (data) => {
    console.log("Call accepted:", data);
    const { callerId, receiverId, receiverPeerId } = data;
    
    // Clear the timeout since call was answered
    const callKey = `${callerId}-${receiverId}`;
    if (callTimeouts.has(callKey)) {
      clearTimeout(callTimeouts.get(callKey));
      callTimeouts.delete(callKey);
      console.log("Call timeout cleared - call accepted");
    }
    
    const caller = userSocketMap.get(callerId);
    
    if (caller) {
      io.to(caller.socketId).emit("call_accepted", {
        receiverId,
        receiverPeerId,
      });
    }
  });

  socket.on("reject_call", (data) => {
    console.log("Call rejected:", data);
    const { callerId, receiverId } = data;
    
    // Clear the timeout since call was answered (rejected)
    const callKey = `${callerId}-${receiverId}`;
    if (callTimeouts.has(callKey)) {
      clearTimeout(callTimeouts.get(callKey));
      callTimeouts.delete(callKey);
      console.log("Call timeout cleared - call rejected");
    }
    
    const caller = userSocketMap.get(callerId);
    
    if (caller) {
      io.to(caller.socketId).emit("call_rejected", {
        receiverId,
      });
    }
  });

  socket.on("end_call", (data) => {
    console.log("Call ended:", data);
    const { callerId, receiverId } = data;
    
    const caller = userSocketMap.get(callerId);
    const receiver = userSocketMap.get(receiverId);
    
    if (caller) {
      io.to(caller.socketId).emit("call_ended", { receiverId });
    }
    
    if (receiver) {
      io.to(receiver.socketId).emit("call_ended", { callerId });
    }
  });

 socket.on('disconnect', () => {
    console.log('Socket disconnected: ', socket.id);
    
    // Clean up user from socket map
    for (const [userId, info] of userSocketMap.entries()) {
      if (info.socketId === socket.id) {
        userSocketMap.delete(userId);
        console.log(`Removed socket for user: ${userId}`);
        
        // Clean up typing timeouts for this user
        for (const [typingKey, timeout] of typingTimeouts.entries()) {
          if (typingKey.startsWith(`${userId}-`)) {
            clearTimeout(timeout);
            typingTimeouts.delete(typingKey);
          }
        }
        
        // Clean up call timeouts for this user
        for (const [callKey, timeout] of callTimeouts.entries()) {
          if (callKey.startsWith(`${userId}-`) || callKey.endsWith(`-${userId}`)) {
            clearTimeout(timeout);
            callTimeouts.delete(callKey);
          }
        }
        break;
      }
    }
  });

}
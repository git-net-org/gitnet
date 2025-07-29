"use client";

import { useEffect, useRef, useState } from "react";
import { useConnection } from "../../store/connectionStore";
import { useSocketStore } from "../../store/useSocketStore";
import { useMessageStore } from "../../store/messageStore";
import { ChatMessage } from "../../types/schemaTypes";
import { useUser } from "../../store/userStore";
import { helpAcceptingInvite } from "../../functions/connection/handleAcceptingInvite";
import EmojiPicker from "emoji-picker-react";
import { Send, Smile, Video } from "lucide-react";
import { useVideoCallStore } from "../../store/videoCallStore";


interface ChatWindowProps {
  activeChat: string | null;
}



interface ChatWindowProps {
  activeChat: string | null;
}

export default function ChatWindow({ activeChat }: ChatWindowProps) {
  const { user } = useUser();
  const { connections, refreshConnection } = useConnection();
  const { socket } = useSocketStore();
  const { setMessage, populateMessage } = useMessageStore();
  const [inputMessage, setinputMessage] = useState<string>("");
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const message = useMessageStore((state) => state.message);
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);

  // Use connections array directly to ensure reactivity
  const activeConnection = connections.find((c) => c.id === activeChat);

  useEffect(() => {
    refreshConnection();

    // Cleanup function to clear typing timeout on unmount
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      emitStopTyping();
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChat || !activeConnection) return;

    const newMessage: ChatMessage = {
      senderId: activeConnection?.user?.id || "",
      receiverId: activeConnection?.connectedUser?.id || "",
      content: inputMessage,
      connectionId: activeConnection.id,
    };

    socket?.emit("send_message", {
      ...newMessage,
    });

    setMessage(newMessage);

    setinputMessage("");
  };

  useEffect(() => {
    if (activeConnection?.id) {
      populateMessage(activeConnection.id);
    }
  }, [activeConnection]);

  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (data: ChatMessage & { connectionId: string }) => {
      // console.log("hi messag erecieved")
      setMessage(data);
    };

    const handleConnectionUpdate = () => {
      console.log("Connection update event received, refreshing connections...");
      const { refreshConnection } = useConnection.getState();
      refreshConnection();
    };

    const handleInvitationSent = () => {
      console.log("Invitation sent successfully, refreshing connections...");
      //update if i see unusual behviour
      refreshConnection();
    };

    socket.on("message_received", handleIncomingMessage);
    socket.on("invitation_sent", handleConnectionUpdate);
    socket.on("invitation_received", handleConnectionUpdate);
    socket.on("invitation_accepted", handleConnectionUpdate);
    socket.on("connection_updated", handleConnectionUpdate);
    socket.on("invitation_sent_success", handleInvitationSent);
    socket.on("invitation_sent_error", (data) => {
      console.error("Error sending invitation:", data.error);
    });

    return () => {
      socket.off("message_received", handleIncomingMessage);
      socket.off("invitation_sent", handleConnectionUpdate);
      socket.off("invitation_received", handleConnectionUpdate);
      socket.off("invitation_accepted", handleConnectionUpdate);
      socket.off("connection_updated", handleConnectionUpdate);
      socket.off("invitation_sent_success", handleInvitationSent);
      socket.off("invitation_sent_error");
    };
  }, [socket, setMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, activeChat]);

  useEffect(() => {
    if (!socket) return;

    const handleUserTyping = (data: { userID: string; isTyping: boolean; receiverID: string }) => {
      console.log("Typing event received:", data);

      setTypingUsers((prev) => {
        const newSet = new Set(prev);
        if (data.isTyping) {
          newSet.add(data.userID);
        } else {
          newSet.delete(data.userID);
        }
        return newSet;
      });
    };

    socket.on("user_typing", handleUserTyping);

    return () => {
      socket.off("user_typing", handleUserTyping);
    };
  }, [socket]);

  // Helper function to emit typing events
  const emitTyping = () => {
    if (!socket || !activeConnection) return;

    socket.emit("typing", {
      userID: user?.id,
      receiverID: activeConnection.connectedUser?.id,
    });
  };

  const emitStopTyping = () => {
    if (!socket || !activeConnection) return;

    socket.emit("stop_typing", {
      userID: user?.id,
      receiverID: activeConnection.connectedUser?.id,
    });
  };

  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleInvite = async (connectionId: string) => {
    console.log("Sending invitation for connection:", connectionId);

    const inviteMessage: ChatMessage = {
      senderId: activeConnection?.user?.id || "",
      receiverId: activeConnection?.connectedUser?.id || "",
      content: `Hey There, ${activeConnection?.user.username} invites you.`,
      connectionId: connectionId,
    };

    socket?.emit("send_message", {
      ...inviteMessage,
    });
    setMessage(inviteMessage);

    socket?.emit("invitation_sent", {
      connectionId,
      invitedBy: user?.username,
      receiverId: activeConnection?.connectedUser?.id || "",
    });

    console.log("Invitation sent via socket, waiting for confirmation...");
  };

  const acceptInvite = async (connectionId: string) => {
    if (connectionId) {
      const status = await helpAcceptingInvite(connectionId);
      if (status === 200) {
        alert("you are connected!");
        // Refresh the connections to get updated state
        const { refreshConnection } = useConnection.getState();
        await refreshConnection();
      }
    }
  };

  // Clear typing state when switching chats
  useEffect(() => {
    // Clear typing timeout when switching to different chat
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Reset typing users when chat changes
    setTypingUsers(new Set());

    // Stop typing for previous chat if any
    emitStopTyping();
  }, [activeChat]);

  return (
    <div className="h-full flex flex-col bg-white shadow-sm rounded-lg overflow-hidden">
      {activeChat ? (
        <>
          {/* Header */}
          <div className="border-b px-4 py-3 flex items-center gap-3 bg-gray-50">
            <img
              src={
                activeConnection?.connectedUser?.avatar ||
                "https://github.com/identicons/default.png"
              }
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="font-semibold text-gray-800 text-sm">
                {activeConnection?.connectedUser?.username}
              </h2>
              <p className="text-xs text-green-600">
                {typingUsers.has(activeConnection?.connectedUser?.id || "") ? "Typing..." : "Online"}
              </p>
            </div>
          </div>{" "}
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-100 space-y-2">
            {activeConnection?.isConversationInvited &&
              activeConnection?.connectionStatus === "ACCEPTED" && (
                <div className="flex justify-center mb-4">
                  <p className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full max-w-fit text-center">
                    This is the beginning of your conversation
                  </p>
                </div>
              )}
            {activeChat &&
            message[activeChat] &&
            Array.isArray(message[activeChat]) ? (
              message[activeChat].map((msg, i) => {
                const isSelf = msg.senderId === activeConnection?.user?.id;
                return (
                  <div
                    key={i}
                    className={`flex ${
                      isSelf ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-xl px-4 py-2 text-sm max-w-[70%] shadow-md ${
                        isSelf ? "bg-blue-500 text-white" : "bg-white text-gray-800"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className="text-[10px] text-right opacity-70 mt-1">
                        {msg.sentAt && formatTime(msg.sentAt)}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-400 py-5">
                {activeChat
                  ? "No messages yet"
                  : "Select a connection to see messages"}
              </div>
            )}
            <div ref={scrollRef} />
          </div>
          {!activeConnection?.allowed &&
            !activeConnection?.isConversationInvited && (
              <div className="p-4 bg-gray-50 border-t">
                <button
                  onClick={() => handleInvite(activeConnection?.id || "")}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Invite to Chat
                </button>
              </div>
            )}
          {activeConnection?.isConversationInvited &&
            activeConnection?.connectionStatus !== "ACCEPTED" &&
            activeConnection.invitedBy !== user?.username && (
              <div className="p-4 bg-gray-50 border-t">
                <button
                  onClick={() => acceptInvite(activeConnection?.id || "")}
                  disabled={activeConnection.invitedBy == user?.username}
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                >
                  Accept Invitation
                </button>
              </div>
            )}
          <form
            onSubmit={sendMessage}
            className="border-t bg-white px-4 py-3 flex items-center space-x-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                disabled={
                  activeConnection?.allowed
                    ? false
                    : message[activeChat] && message[activeChat].length === 1
                    ? true
                    : false
                }
                value={inputMessage}
                onChange={(e) => {
                  setinputMessage(e.target.value);

                  // Emit typing event
                  emitTyping();

                  // Clear existing timeout
                  if (typingTimeoutRef.current) {
                    clearTimeout(typingTimeoutRef.current);
                  }

                  // Set new timeout to stop typing after 1 second of inactivity
                  typingTimeoutRef.current = setTimeout(() => {
                    emitStopTyping();
                  }, 1000);
                }}
                onBlur={() => {
                  // Stop typing when input loses focus
                  emitStopTyping();
                  if (typingTimeoutRef.current) {
                    clearTimeout(typingTimeoutRef.current);
                  }
                }}
                onKeyDown={(e) => {
                  // Stop typing when user presses Enter (sends message)
                  if (e.key === 'Enter') {
                    emitStopTyping();
                    if (typingTimeoutRef.current) {
                      clearTimeout(typingTimeoutRef.current);
                    }
                  }
                }}
                placeholder={
                  !activeConnection?.isMutual
                    ? "You can only message mutual connections"
                    : "Type a message..."
                }
                className={`w-full ${
                  !activeConnection?.isMutual
                    ? "cursor-not-allowed bg-gray-100"
                    : "bg-gray-100"
                } text-black rounded-full border-transparent focus:border-blue-500 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <EmojiPicker
                  onEmojiClick={(e) => {
                    console.log(inputMessage + e.emoji);
                    setinputMessage(inputMessage + e.emoji);
                  }}
                  open={emojiOpen}
                />
              </div>
            </div>
            <button type="button"
              onClick={() => setEmojiOpen(prev => !prev)}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full">
              <Smile />
            </button>
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full disabled:opacity-50"
            >
              <Send />
            </button>
            <button
              onClick={() => {
                if (!activeConnection?.id) return;
                console.log('🎥 Video call button clicked');
                console.log('Connected user ID:', activeConnection.connectedUser?.id);
                const { initiateCall } = useVideoCallStore.getState();
                initiateCall(activeConnection.connectedUser?.id || "");
              }}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
            >
              <Video />
            </button>
          </form>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p className="text-gray-500">Select a user to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
}


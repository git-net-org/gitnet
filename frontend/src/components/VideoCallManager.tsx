"use client";

import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { useSocketStore } from "../../store/useSocketStore";
import { useUser } from "../../store/userStore";
import { PhoneCall, PhoneOff, Video, VideoOff } from "lucide-react";

interface VideoCallManagerProps {
  isOpen: boolean;
  onClose: () => void;
  receiverId?: string;
  incomingCall?: {
    receiverId:string;
    callerId: string;
    callerPeerId: string;
    callType: 'video' | 'audio';
  };
}

export default function VideoCallManager({ 
  isOpen, 
  onClose, 
  receiverId, 
  incomingCall 
}: VideoCallManagerProps) {
  const [peerInstance, setPeerInstance] = useState<Peer | null>(null);
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'ringing' | 'connected' | 'ended'>('idle');
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  const { socket } = useSocketStore();
  const { user } = useUser();

  // Initialize PeerJS
  useEffect(() => {
    if (!isOpen || !user?.id) return;

    const peer = new Peer(user.id, {
      host: "localhost",
      port: 5000,
      path: "/peerjs",
    });

    peer.on('open', (id) => {
      console.log('PeerJS connected with ID:', id);
      setPeerInstance(peer);
    });

    peer.on('call', (call) => {
      console.log('Incoming call received');
      
      if (localStream) {
        call.answer(localStream);
        
        call.on('stream', (remoteStream) => {
          setRemoteStream(remoteStream);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
        
        setCallStatus('connected');
      }
    });

    peer.on('error', (error) => {
      console.error('PeerJS error:', error);
    });

    return () => {
      peer.destroy();
    };
  }, [isOpen, user?.id, localStream]);

  // Get user media
  useEffect(() => {
    if (!isOpen) return;

    console.log("equals",user?.id==receiverId, receiverId)

    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: isVideoEnabled,
          // audio: isAudioEnabled,
        });
        
        setLocalStream(stream);
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    getUserMedia();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen, isVideoEnabled, isAudioEnabled]);

  // Socket event handlers
  useEffect(() => {
    if (!socket || !isOpen) return;
    
console.log("incoming callll:", incomingCall)
    const handleCallAccepted = (data: any) => {
      console.log('Call accepted:', data);
      if (peerInstance && localStream) {
        const call = peerInstance.call(data.receiverPeerId, localStream);
        
        call.on('stream', (remoteStream) => {
          setRemoteStream(remoteStream);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
        
        setCallStatus('connected');
      }
    };

    const handleCallerTimeOut = () =>{
      console.log('Call timed out');
      setCallStatus('ended');
      setTimeout(() => {
        onClose();
      }, 2000);
    }
    const handleCallRejected = (data: any) => {
      console.log('Call rejected:', data);
      setCallStatus('ended');
      setTimeout(() => {
        onClose();
      }, 2000);
    };

    const handleCallEnded = (data: any) => {
      console.log('Call ended:', data);
      setCallStatus('ended');
      setTimeout(() => {
        onClose();
      }, 2000);
    };
    socket.on('timed_out',handleCallerTimeOut)
    socket.on('call_accepted', handleCallAccepted);
    socket.on('call_rejected', handleCallRejected);
    socket.on('call_ended', handleCallEnded);

    return () => {
      socket.off('timed_out', handleCallerTimeOut);
      socket.off('call_accepted', handleCallAccepted);
      socket.off('call_rejected', handleCallRejected);
      socket.off('call_ended', handleCallEnded);
    };
  }, [socket, isOpen, peerInstance, localStream, onClose]);

  // Handle incoming calls from store
  useEffect(() => {
    if (incomingCall && isOpen) {
      console.log('Incoming call detected:', incomingCall);
      setCallStatus('ringing');
    }
  }, [incomingCall, isOpen]);

  const initiateCall = () => {
    if (!socket || !receiverId || !user?.id) return;

    console.log('🎥 Initiating call...');
    console.log('Caller ID:', user.id);
    console.log('Receiver ID:', receiverId);
    console.log('Socket connected:', socket.connected);
    
    setCallStatus('calling');
    
    socket.emit('initiate_call', {
      callerId: user.id,
      receiverId,
      callerPeerId: user.id,
      callType: 'video',
    });
  };

  const acceptCall = () => {
    if (!socket || !incomingCall || !user?.id) return;

    socket.emit('accept_call', {
      callerId: incomingCall.callerId,
      receiverId: user.id,
      receiverPeerId: user.id,
    });
  };

  const rejectCall = () => {
    if (!socket || !incomingCall || !user?.id) return;

    socket.emit('reject_call', {
      callerId: incomingCall.callerId,
      receiverId: user.id,
    });
    
    onClose();
  };

  const endCall = () => {
    if (!socket || !user?.id) return;

    const otherUserId = receiverId || incomingCall?.callerId;
    
    if (otherUserId) {
      socket.emit('end_call', {
        callerId: user.id,
        receiverId: otherUserId,
      });
    }
    
    // Clean up streams
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    
    setCallStatus('ended');
    onClose();
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {callStatus === 'calling' && 'Calling...'}
            {callStatus === 'ringing' && 'Incoming Call'}
            {callStatus === 'connected' && 'Video Call'}
            {callStatus === 'ended' && 'Call Ended'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Local Video */}
          <div className="relative">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-48 bg-gray-200 rounded-lg object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              You
            </div>
          </div>

          {/* Remote Video */}
          <div className="relative">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-48 bg-gray-200 rounded-lg object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              Remote
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4">
          {incomingCall?.callType!=="video" && callStatus=="idle" && (
            <button
            onClick={initiateCall}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              {callStatus}
              <PhoneCall size={20} />
              <span>Start Call</span>
            </button>
          )}
{receiverId&&<>
<p className="text-green-300">Ringing...</p> 
</>}
          {incomingCall?.callType==="video" && callStatus!== "connected" && (
            <>
              <button
                onClick={acceptCall}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                {callStatus}
                <PhoneCall size={20} />
                <span>Accept</span>
              </button>
              <button
                onClick={rejectCall}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <PhoneOff size={20} />
                <span>Reject</span>
              </button>
            </>
          )}

          {(callStatus === 'connected' || callStatus === 'calling') && (
            <>
              <button
                onClick={toggleVideo}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  isVideoEnabled 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-500 hover:bg-gray-600 text-white'
                }`}
              >
                {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                <span>Video</span>
              </button>
              
              <button
                onClick={toggleAudio}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  isAudioEnabled 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-500 hover:bg-gray-600 text-white'
                }`}
              >
                <PhoneCall size={20} />
                <span>Audio</span>
              </button>
              
              <button
                onClick={endCall}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <PhoneOff size={20} />
                <span>End Call</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

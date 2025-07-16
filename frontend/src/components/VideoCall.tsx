"use client";

import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

interface PeerPageProp {
  myUniqueId: string;
  idToCall:string;
  calling:true;
}

const PeerPage = ({ myUniqueId, idToCall }: PeerPageProp) => {
  const myVideoRef = useRef<HTMLVideoElement>(null);
    const callingVideoRef = useRef<HTMLVideoElement>(null);
const [peerInstance, setPeerInstance] = useState<Peer | null>(null);

  const handleCall = () => {
    console.log("calling...")
    navigator.mediaDevices.getUserMedia({
      video: true,
    //   audio: true,
    }).then(stream => {
      const call = peerInstance?.call(idToCall, stream);
      if (call) {
        call.on('stream', userVideoStream => {
          if (callingVideoRef.current) {
            callingVideoRef.current.srcObject = userVideoStream;
          }
        });
      }
    });
  };

  useEffect(() => {
    const peer = new Peer(myUniqueId, {
      host: "localhost",
      port: 5000, //PORT
      path: "/peerjs",
    });
    setPeerInstance(peer);

    if (myVideoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        console.log("stream", stream);
        if (myVideoRef.current) {
          console.log("current", myVideoRef.current);
          myVideoRef.current.srcObject = stream;
        }
        peer.on('call', call => {
              call.answer(stream);
              call.on('stream', userVideoStream => {
                if (callingVideoRef.current) {
                  callingVideoRef.current.srcObject = userVideoStream;
                }
              });
            });
      });
    }



    return () => {
      if (peer) {
        peer.destroy();
      }
      if (myVideoRef.current?.srcObject) {
        const stream = myVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col z-100 justify-center items-center p-12">
      hii
      <video
        className="w-72 border-2 bg-red-200"
        playsInline
        ref={myVideoRef}
        autoPlay
      />
<button onClick={handleCall}>call</button>
hii
       <video className="w-72 border-2 bg-red-200" playsInline ref={callingVideoRef} autoPlay/>
    </div>
  );
};

export default PeerPage;

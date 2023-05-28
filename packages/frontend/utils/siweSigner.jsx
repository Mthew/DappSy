import { SiweMessage } from "siwe";
import { useAccount, useNetwork, useSignMessage } from "wagmi";


import React from 'react'

export const general = () => {

  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();

  const events = {
    connect: (e) => {
      e.preventDefault();
      if (!isConnected) {
        connect();
      } else {
        events.handleMessage();
      }
    },
    handleMessage: async () => {
      try {
        const siweMessage = new SiweMessage({
          domain: window.location.host,
          address: address,
          statement: message,
          uri: window.location.origin,
          version: "1",
          chainId: chain?.id,
          nonce: token,
        });
        const signature = await signMessageAsync({
          message: siweMessage.prepareMessage(),
        });
        onConnect(signature, siweMessage);
      } catch (error) {
        console.log("connect-error", error);
      }
    },
  };

 

  return (
    <div>general</div>
  )
}
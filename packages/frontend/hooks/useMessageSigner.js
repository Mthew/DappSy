import { SiweMessage } from "siwe";
import { useAccount, useNetwork, useSignMessage } from "wagmi";

export function useMessageSigner() {
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
    handleMessage: async (message, onSign) => {
      try {
        const siweMessage = new SiweMessage({
          domain: window.location.host,
          address,
          statement: message,
          uri: window.location.origin,
          version: "1",
          chainId: chain?.id,
        });
        const signature = await signMessageAsync({
          message: siweMessage.prepareMessage(),
        });
        onSign && onSign(signature, siweMessage);
      } catch (error) {
        console.log("connect-error", error);
      }
    },
  };

  return {
    showSignerMessage: events.handleMessage
  }
}
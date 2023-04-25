import { SiweMessage } from "siwe";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import style from "../../styles/modules/login.module.css";

function Web3ButtonSigner({
  label,
  message,
  onConnect = () => {},
  token,
}) {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

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
    <button
      className={`${style["dappsy-button-primary"]} inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600`}
      onClick={events.connect}
    >
      {label}&nbsp;
      <span className="text-indigo-200" aria-hidden="true">
        &rarr;
      </span>
    </button>
  );
}

export default Web3ButtonSigner;

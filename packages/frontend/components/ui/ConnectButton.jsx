import { useEffect } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { Modal } from "antd";
import { InjectedConnector } from "wagmi/connectors/injected";
import style from "../../styles/modules/login.module.css";

const { confirm } = Modal;

const showConfirm = () => {
  confirm({
    title: "No tiene metamask intalado para poder conectarse",
    icon: <aiOutlineExclamationCircle />,
    content: (
      <>
        Para instalarlo siga los pasos de este tutorial:
        <br />
        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noreferrer"
        >
          1. Descargar Metamask
        </a>
        <br />
        <a
          href="https://support.metamask.io/hc/es/articles/360015489531-Comenzar-con-MetaMask"
          target="_blank"
          rel="noreferrer"
        >
          2. Ver turorial de instalación
        </a>
      </>
    ),
    cancelButtonProps: {
      hidden: true,
    },
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

function Web3ButtonSigner({ label, message, onConnect = () => {}, token }) {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { connect, error } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    if (!isConnected) {
      connect();
    }
  }, [isConnected]);

  useEffect(() => {
    console.log("error", { error });
    if (error && error.name === "ConnectorNotFoundError") {
      showConfirm();
    }
  }, [error]);

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

import { useEffect } from "react";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useRouter } from "next/router";
import style from "../../styles/modules/login.module.css"

function SignIn({
  label = "Sign-in",
  onConnect = () => {},
  loading = false,
  callbackUrl = "/",
  token,
}) {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { push } = useRouter();
  const { data: session, status } = useSession();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const events = {
    connect: (e) => {
      e.preventDefault();
      if (!isConnected) {
        connect();
      } else {
        events.handleLogin();
      }
      onConnect();
    },
    handleLogin: async () => {
      try {
        const message = new SiweMessage({
          domain: window.location.host,
          address: address,
          statement: "Sign in with Ethereum to the app.",
          uri: window.location.origin,
          version: "1",
          chainId: chain?.id,
          nonce: token,
        });
        const signature = await signMessageAsync({
          message: message.prepareMessage(),
        });
        const { url } = await signIn("credentials", {
          message: JSON.stringify(message),
          redirect: false,
          signature,
          callbackUrl,
        });
        console.log("DATA", url);
        push(url);
      } catch (error) {
        console.log("error", error);
      }
    },
  };

  useEffect(() => {
    console.log(isConnected);
    if (isConnected && !session) {
      events.handleLogin();
    }
  }, [isConnected]);

  return (
    <button
      className={`${style["dappsy-button-primary"]} inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600`}
      onClick={events.connect}
    >
      {label}&nbsp;
      <span class="text-indigo-200" aria-hidden="true">
        &rarr;
      </span>
    </button>
  );
}

export default SignIn;

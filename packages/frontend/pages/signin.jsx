import { useEffect } from "react";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useRouter } from "next/router";

import Logo from "../components/Layout/Logo";

function SignIn() {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { push } = useRouter();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { data: session, status } = useSession();

  const handleLogin = async () => {
    try {
      const callbackUrl = "/protected";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
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
      // window.alert(error);
      console.log("error", error);
    }
  };

  useEffect(() => {
    console.log(isConnected);
    if (isConnected && !session) {
      handleLogin();
    }
  }, [isConnected]);

  const SignInButton = () => (
    <button
      className="dappsy-button-primary inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600"
      onClick={(e) => {
        e.preventDefault();
        if (!isConnected) {
          connect();
        } else {
          handleLogin();
        }
      }}
    >
      Sign-in&nbsp;
      <span class="text-indigo-200" aria-hidden="true">
        &rarr;
      </span>
    </button>
  );

  return (
    <>
      <span class="dappsy-background-1"></span>
      <span class="dappsy-background-2"></span>
      <div className="container mx-auto h-screen place-items-center">
        <header className="py-5 px-2 bg-none flex justify-between">
          <Logo className="text-white" />
          <SignInButton />
        </header>
        <section className="grid h-3/4 place-items-center">
          <div>
            <h1 className="py-2 text-3xl text-slate-200 text-center">
              ¡Bienbenido!
            </h1>
            <h3 className="pb-5 text-lg text-slate-200 text-center">
              Use su billetara para ingresar, y empezar a ser parte de la nueva
              revolución economica
            </h3>
          </div>
          <div className="h-full w-1/4 p-8 rounded-md bg-white shadow-xl grid h-3/4 place-items-center text-center text-slate-300">
            <div className="w-full">
              <p className="text-sm">Sign In</p>
              <Logo />
              <hr />
            </div>
            <div>
              <p className="p-10 text-sm">
                Conecta tu wallet para ingresar a DAPPSY
              </p>
              <SignInButton />
            </div>
          </div>
        </section>
        <footer></footer>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default SignIn;

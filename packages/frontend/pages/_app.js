import "../styles/globals.css";
import Head from "next/head";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
  useSigner,
  useContract,
} from "wagmi";
import { SessionProvider } from "next-auth/react";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
// import projectMakerABI from "../utils/projectMakerABI.json";

import { AuthProvider, ProfileProvider } from "../context";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli],
  // [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "D A P P S Y Wallet",
  chains,
});

const wagmiClient = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
  connectors,
});

function MyApp({ Component, pageProps }) {
  // const projectMaker = useContract({
  //   addressOrName: "0xA8b3b16356D4533cAF03829d3616744438AEEc6E",
  //   contractInterface: projectMakerABI,
  // });

  // console.log("🚀 ~ file: _app.js ~ line 40 ~ MyApp ~ projectMakerContract", projectMaker);
  // console.log("🚀 ~ file: _app.js ~ line 41 ~ MyApp ~ projectMakerABI", projectMakerABI);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <AuthProvider>
          <ProfileProvider>
            <RainbowKitProvider chains={chains}>
              <Head>
                <title>D A A P S Y</title>
                <meta
                  name="description"
                  content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
              </Head>
              {getLayout(<Component {...pageProps} />)}
            </RainbowKitProvider>
          </ProfileProvider>
        </AuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;

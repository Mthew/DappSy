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
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
// import projectMakerABI from "../utils/projectMakerABI.json";

const { chains, provider } = configureChains(
  [chain.goerli],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "La Vaca web3",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  // const projectMaker = useContract({
  //   addressOrName: "0xA8b3b16356D4533cAF03829d3616744438AEEc6E",
  //   contractInterface: projectMakerABI,
  // });


  // console.log("🚀 ~ file: _app.js ~ line 40 ~ MyApp ~ projectMakerContract", projectMaker);
  // console.log("🚀 ~ file: _app.js ~ line 41 ~ MyApp ~ projectMakerABI", projectMakerABI);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Head>
          <title>VACAWEB3</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
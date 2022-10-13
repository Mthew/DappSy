import Layout from "../components/Layout/Layout";
import Sidebar from "../components/Layout/Sidebar";
import ConnectWalletButton from "../components/Wallet/WalletConnect";

export default function Index() {
  return (
    <section>
      <ConnectWalletButton />
    </section>
  );
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};

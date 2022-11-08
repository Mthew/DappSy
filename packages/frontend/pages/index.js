import Layout from "../components/Layout/Layout";
import Sidebar from "../components/Layout/Sidebar";

export default function Index() {
  return (
    <section>
      <h1>Hola</h1>
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

import Head from "next/head";
import styles from "./layout.module.css";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>DAPPSY</title>
      </Head>
      <section className="flex flex-row">
        <Sidebar />
        <main className="d-flex justify-content align-items">
          <Header></Header>
          <div className="bg-slate-200 min-h-[80%] max-w-screen-sm max-w-screen-md max-w-screen-lg max-w-screen-xl max-w-screen-xl main-content box-content px-10 py-5">{children}</div>
        </main>
      </section>
    </>
  );
}

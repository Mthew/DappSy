import Head from "next/head";
import { Breadcrumb, Layout, Typography } from "antd";

import { Header, Footer } from "./";
import { LoadingRouter } from "../ui";

import style from "./styles/layout.module.css";

const { Content } = Layout;
const { Title } = Typography;

export default function LayoutApp({ children, title }) {
  return (
    <>
      <Head>
        <title>{title || "D A P P S Y"}</title>
        <meta name="author" content="M_THEW" />
        <meta
          name="description"
          content={`Daapsy is an app for fisical assets tokenization`}
        />
        <meta
          name="keywords"
          content={`NFT, blockchain, Smart Contract, tokenization`}
        />
      </Head>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Layout style={{ background: "none !important" }}>
          <span className={`${style["dappsy-background-3"]}`}></span>
          <Header />

          <Content
            style={{
              margin: "0 16px",
            }}
            className={`${style.main} sm:px-2 md:px-4 lg:px-8 xl:px-10 2xl:px-16`}
          >
            <LoadingRouter />
            <Title
              style={{ color: "white" }}
              level={4}
              className="flex-none ml-3"
            >
              {title}
            </Title>
            <section
              style={{
                padding: 24,
                minHeight: 360,
              }}
              className={`container mx-auto px-16`}
            >
              {children}
            </section>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
}

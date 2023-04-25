import Head from "next/head";
import { Breadcrumb, Layout, Typography } from "antd";

import { Header } from "./";
import style from "./styles/layout.module.css";

const { Content, Footer } = Layout;
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
            className={style.main}
          >
            <section
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Title
                style={{ color: "white" }}
                level={4}
                className="flex-none ml-3"
              >
                {title}
              </Title>
              {children}
            </section>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Tecnologico de Antioquia ©2023 Created by M_THEW<br />
            v1.0.0
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

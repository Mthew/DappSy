import Head from 'next/head'
import styles from './layout.module.css'
import Header from '../Header';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>DAPPSY</title>
      </Head>
      <Header></Header>
      <main className={styles.main}>{children}</main>
    </>
  )
}
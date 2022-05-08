
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import styles from '../styles/home.module.scss'

export default function Home({ name }) {
  return (
    <>
      <Head>
        <title>home | ig.news </title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>

          <p>
            Get access to all the publications
            <span>for $9.90 month</span>
          </p>

          <SubscribeButton />

        </section>

        <img src="/images/girl-coding.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      name: 'Manuel'
    }
  }
}

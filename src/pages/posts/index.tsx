import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../service/prismic";
import styles from './styles.module.scss';
import Prismic from "@prismicio/client";

export default function Posts() {
  return (
    <>
      <Head>
        <title>posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Teste de post, teste</strong>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>
          </a>

          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Teste de post, teste</strong>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>
          </a>

          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Teste de post, teste</strong>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>
          </a>

          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Teste de post, teste</strong>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'posts')
  ], {
    fetch: ['posts.title', 'posts.content'],
    pageSize: 20,
  })

  console.log('response: ', response);


  return {
    props: {}
  }
}
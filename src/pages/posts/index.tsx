import { getPrismicClient } from "../../service/prismic";
import { GetStaticProps } from "next";
import { useState } from "react";
import { RichText } from 'prismic-dom'
import Prismic from "@prismicio/client";

import Head from "next/head";
import styles from './styles.module.scss';
import Link from "next/link";
import { Spinner } from "../../components/Spinner";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;

}

interface postsProps {
  posts: Post[]
}

export default function Posts({ posts }: postsProps) {
  const [handleClick, setHandleClick] = useState(false);

  function showClick() {
    setHandleClick(true);
  }

  return (
    <>
      <Head>
        <title>posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        {
          handleClick ? (
            <div className={styles.spinnerPosts}>
              <Spinner color="#ffffff4f" size='lg' />
            </div>
          ) : (
            <div className={styles.posts}>

              {
                posts.map(post => (
                  <Link key={post.slug} href={`/posts/${post.slug}`} >
                    <a href='#' onClick={showClick}>
                      <time>{post.updatedAt}</time>
                      <strong>{post.title}</strong>
                      <p>{post.excerpt}</p>
                    </a>
                  </Link>
                ))
              }

            </div>
          )
        }
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query<any>([
    Prismic.Predicates.at('document.type', 'posts')
  ], {
    fetch: ['posts.title', 'posts.content'],
    pageSize: 20,
  })

  const posts = response.results.map(post => ({
    slug: post.uid,
    title: RichText.asText(post.data.title),
    excerpt: post.data.content.find(content => content.type === 'paragraph').text ?? '',
    updatedAt: new Date(post.first_publication_date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }))

  return {
    props: {
      posts
    }
  }
}
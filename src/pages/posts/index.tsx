import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../service/prismic";
import styles from './styles.module.scss';
import Prismic from "@prismicio/client";
import { RichText } from 'prismic-dom'
import Link from "next/link";

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

  return (
    <>
      <Head>
        <title>posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>

          {
            posts.map(post => (
              <Link key={post.slug} href={`/posts/${post.slug}`}>
                <a href='#'>
                  <time>{post.updatedAt}</time>
                  <strong>{post.title}</strong>
                  <p>{post.excerpt}</p>
                </a>
              </Link>
            ))
          }

        </div>
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
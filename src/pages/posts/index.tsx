import { getPrismicClient } from "../../services/prismic";
import { GetStaticProps } from "next";
import { useState } from "react";
import { RichText } from 'prismic-dom'
import Prismic from "@prismicio/client";

import Head from "next/head";
import styles from './styles.module.scss';
import Link from "next/link";
import { Spinner } from "../../components/Spinner";
import { useTheme } from "../../contexts/theme";

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
  const { theme, color } = useTheme()
  const [handleClick, setHandleClick] = useState(false);

  function showClick() {
    setHandleClick(true);
  }

  const [elementMouseHover, setElementMouseHover] = useState('')
  const [mouseActive, setMouseActive] = useState(false)

  function enterSection(slug: string) {
    setElementMouseHover(slug)
    setMouseActive(true)
  }

  function closeSection(slug: string) {
    setElementMouseHover(slug)
    setMouseActive(false)
  }

  function StrongComponent(slug: string, title: string) {
    let style = {
      color: theme.color
    }

    if (mouseActive && slug === elementMouseHover) {
      style = {
        color: color.primary
      }
    }

    return (
      <strong style={style}>{title} </strong>
    )
  }


  return (
    <div className={styles.container} style={{ backgroundColor: theme.bgPrimary, color: theme.color }}>
      <Head>
        <title>posts | ig.news</title>
      </Head>

      <main className={styles.postContainer}>
        {
          handleClick ? (
            <div className={styles.spinnerPosts}>
              <Spinner color={theme.bgSecondary} size='lg' />
            </div>
          ) : (
            <div className={styles.posts} >

              {
                posts.map(post => (
                  <Link key={post.slug} href={`/posts/${post.slug}`}  >
                    <a onClick={showClick} onMouseEnter={() => enterSection(post.slug)} onMouseLeave={() => closeSection(post.slug)}>
                      <time>{post.updatedAt}</time>
                      {StrongComponent(post.slug, post.title)}
                      <p>{post.excerpt}</p>
                    </a>
                  </Link>
                ))
              }
            </div>
          )
        }
      </main >
    </div >
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
    updatedAt: new Date(post.last_publication_date).toLocaleString('pt-BR', {
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
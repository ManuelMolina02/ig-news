import { getPrismicClient } from "../../services/prismic";
import { GetStaticProps } from "next";
import { useState } from "react";
import { RichText } from 'prismic-dom'

import Head from "next/head";
import styles from './styles.module.scss';
import Link from "next/link";
import { Spinner } from "../../components/Spinner";
import { useTheme } from "../../contexts/theme";
import { api } from "../../services/api";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface postsProps {
  posts: Post[],
  next_page: string | null,
}

export default function Posts({ posts, next_page }: postsProps) {
  const { theme, color } = useTheme()
  const [handleClick, setHandleClick] = useState(false);
  const [mouseActive, setMouseActive] = useState(false)
  const [elementMouseHover, setElementMouseHover] = useState('')

  const [morePostsValeus, setMorePostsValues] = useState(next_page)
  const [nextPage, setNextPage] = useState(next_page)
  const [postValues, setPostValues] = useState(posts)

  const [loading, setLoading] = useState(false)

  async function handleNewPosts() {

    setLoading(true)

    setTimeout(async () => {
      try {
        const { data } = await api.get(nextPage)

        const dataValues = Object.values<any>(data.results).map(post => {
          return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph').text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })
          }
        })

        setPostValues([...postValues, ...dataValues])

        if (!data.next_page) {
          setMorePostsValues(null)
        } else {
          setNextPage(data.next_page)
        }

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false)
      }

    }, 1000);
  }

  function showClick() {
    setHandleClick(true);
  }

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
                postValues.map(post => (
                  <Link key={post.slug} href={`/posts/${post.slug}`}  >
                    <a onClick={showClick} onMouseEnter={() => enterSection(post.slug)} onMouseLeave={() => closeSection(post.slug)}>
                      <time>{post.updatedAt}</time>
                      {StrongComponent(post.slug, post.title)}
                      <p>{post.excerpt}</p>
                    </a>
                  </Link>
                ))
              }

              {
                morePostsValeus && (
                  <button
                    onClick={() => handleNewPosts()}
                    className={styles.infiniteScrollBtn}
                    style={{ color: color.primary }}
                  >
                    view more {loading ? <Spinner color={color.primary} size='sm' /> : '...'}
                  </button>
                )
              }
            </div>
          )
        }
      </main >
    </div >
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});

  const response = await prismic.getByType('posts', {
    fetch: ['posts.title', 'posts.content'],
    pageSize: 3,
    page: 1,
  });

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
      posts,
      next_page: response.next_page,
    },
    revalidate: 60 * 60 * 24 * 7 // 1 week, 
  }
}
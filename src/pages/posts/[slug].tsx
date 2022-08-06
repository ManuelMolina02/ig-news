import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { useTheme } from "../../contexts/theme";
import { getPrismicClient } from "../../services/prismic";
import styles from './post.module.scss'

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function Post({ post }: PostProps) {
  const { theme, color } = useTheme()
  const route = useRouter()

  return (
    <div className={styles.container} style={{ backgroundColor: theme.bgPrimary, color: theme.color }}>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>


      <main className={styles.postContainer}>


        <article className={styles.post}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              fontSize: '1.2rem',
              marginBottom: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => route.push('/posts')}
          >
            <AiOutlineLeft color={theme.color} title="Settings" size={20} />
            back
          </div>

          <h1 style={{ color: color.primary }}>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const { slug } = params;

  if (session?.activeUserSubscription === undefined) {
    return {
      redirect: {
        destination: `/posts/preview/${slug}`,
        permanent: false
      }
    }
  }

  const prismic = getPrismicClient({ req });
  const response = await prismic.getByUID<any>('posts', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }
  return {
    props: {
      post
    }
  }
} 
import { GetStaticPaths, GetStaticProps } from "next"
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { useTheme } from "../../../contexts/theme";
import { getPrismicClient } from "../../../services/prismic";
import styles from '../post.module.scss'

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme, color } = useTheme()



  useEffect(() => {
    if (session?.activeUserSubscription !== undefined) {
      router.push(`/posts/${post.slug}`);
    }
  }, [post.slug, router, session]);



  return (
    <div className={styles.container} style={{ backgroundColor: theme.bgPrimary, color: theme.color }}>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>

      <main className={styles.postContainer}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.postPreview}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading} style={{ backgroundColor: theme.bgSecondary }}>
            Wanna continue reading?
            <Link href={'/'}>
              <a href="" style={{ color: color.primary }}>Subcribe now 🤗</a>
            </Link>

          </div>
        </article>
      </main>
    </div>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient({});
  const response = await prismic.getByUID<any>('posts', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }
  return {
    props: {
      post
    },
    redirect: 60 * 30 //30 minutes
  }
} 
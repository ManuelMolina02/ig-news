
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { SubscribeButton } from '../components/SubscribeButton'
import { useTheme } from '../contexts/theme'
import { stripe } from '../services/stripe'
import styles from '../styles/home.module.scss'


interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}


export default function Home({ product }: HomeProps) {
  const { theme, color, image } = useTheme()

  return (
    <div className={styles.container} style={{ backgroundColor: theme.bgPrimary }}>
      <Head>
        <title>home | ig.news </title>
      </Head>

      <main className={styles.contentContainer} >
        <section className={styles.hero} style={{ color: theme.color }}>

          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>

          <p>
            Get access to all the publications
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />

        </section>


        <img key={image.url} src={image.url} alt="Girl coding" />


      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KLp5jDOPilXXajRqYY5HOX0', {
    expand: ['product'],
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 1 day


  }


}

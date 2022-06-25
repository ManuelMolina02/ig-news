import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import { Spinner } from '../Spinner';
import styles from './styles.module.scss'



export function SubscribeButton() {
  const { data: session } = useSession();
  const router = useRouter()

  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);

    if (!session) {
      signIn('github');
      return
    }

    if (session?.activeUserSubscription !== undefined) {
      router.push('/posts')
      return
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data;
      const stripe = await getStripeJs();

      stripe.redirectToCheckout({ sessionId })

    } catch (error) {
      alert(error.message)
    }

  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      {
        !loading ? 'Subscribe now' :

          <>
            <Spinner color='var(--pink-800)' size='sm' mg='0 10px' />
            Loading...
          </>
      }
    </button>

  )
}
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { api } from '../../service/api';
import { getStripeJs } from '../../service/stripe-js';
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);

    if (!session) {
      signIn('github');
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
        !loading ? 'Subscribe now' : 'Loading...'
      }
    </button>

  )
}
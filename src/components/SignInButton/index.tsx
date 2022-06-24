import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Spinner } from '../Spinner';


export function SignInButton() {
  const { data: session } = useSession();
  const [loadingSingIn, setLoadingSingIn] = useState(false);

  function handleSignIn() {
    setLoadingSingIn(true);

    try {
      signIn('github');

    } catch {
      setLoadingSingIn(false);
    }

  }

  return session ? (
    <button type='button' className={styles.singInButton} onClick={() => signOut()}>
      <FaGithub color='#04d361' />
      {session.user.name}
      <FiX color='#737380' className={styles.closeIcon} />

    </button>
  ) : (
    <button type='button' className={styles.singInButton} onClick={() => handleSignIn()}>
      {
        loadingSingIn
          ?
          <Spinner color='#ffffffcb' size='sm' />
          :
          <FaGithub color='#ffffffcb' />
      }

      Sign in with Github
    </button>
  )


}
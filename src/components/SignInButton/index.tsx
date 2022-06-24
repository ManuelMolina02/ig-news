import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Spinner } from '../Spinner';
import { useTheme } from '../../contexts/theme';


export function SignInButton() {
  const { data: session } = useSession();
  const [loadingSingIn, setLoadingSingIn] = useState(false);
  const { theme } = useTheme()

  function handleSignIn() {
    setLoadingSingIn(true);

    try {
      signIn('github');

    } catch {
      setLoadingSingIn(false);
    }

  }

  return session ? (
    <button type='button' className={styles.singInButton} style={{ backgroundColor: theme.bgSecondary, color: theme.color }} onClick={() => signOut()}>
      <FaGithub color='#04d361' />
      {session.user.name}
      <FiX color='#737380' className={styles.closeIcon} />

    </button>
  ) : (
    <button type='button' className={styles.singInButton} onClick={() => handleSignIn()} style={{ backgroundColor: theme.bgSecondary, color: theme.color }}>
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
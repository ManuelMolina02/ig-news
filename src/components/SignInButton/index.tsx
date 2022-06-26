import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Spinner } from '../Spinner';
import { useTheme } from '../../contexts/theme';
import { IoMdColorFill } from 'react-icons/io';

export function SignInButton() {
  const { theme, color } = useTheme()
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
    <button type='button' className={styles.singInButton} style={{ backgroundColor: theme.bgSecondary, color: theme.color }} onClick={() => signOut()}>
      <FaGithub color={theme.gitIconActive} />
      {session.user.name}
      <FiX color='#737380' className={styles.closeIcon} />

    </button>
  ) : (
    <button type='button' className={styles.singInButton} onClick={() => handleSignIn()} style={{ backgroundColor: theme.bgSecondary, color: theme.color }}>
      {
        loadingSingIn
          ?
          <Spinner color={color.primary} size='sm' />
          :
          <FaGithub color={theme.color} />
      }

      Sign in with Github
    </button>
  )
}
import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Spinner } from '../Spinner';
import { useTheme } from '../../contexts/theme';

export function SignInButton() {
  const { theme, color } = useTheme()
  const { data: session } = useSession();

  const [loadingSingIn, setLoadingSingIn] = useState(false);

  const [showButton, setShowButton] = useState(false);


  function handleSignIn() {
    setLoadingSingIn(true);
    try {
      signIn('github');

    } catch {
      setLoadingSingIn(false);
    }

  }

  setTimeout(() => {
    setShowButton(true)
  }, 2000)



  //alert(showButton)
  const dataStyle = !showButton ? {
    padding: '10px',
    borderRadius: '200px',
    display: 'flex',
    border: 'none'
  } : {}

  return session ? (
    <button type='button' className={styles.singInButton} style={{ backgroundColor: theme.bgSecondary, color: theme.color }} onClick={() => signOut()}>
      <FaGithub color={theme.gitIconActive} />
      {session.user.name}
      <FiX color='#737380' className={styles.closeIcon} />

    </button>
  ) : (
    <button type='button' className={showButton ? styles.singInButton : ''} onClick={() => handleSignIn()} style={{ backgroundColor: theme.bgSecondary, color: theme.color, ...dataStyle }}>
      {
        !showButton ?
          <Spinner color={color.primary} size='sm' /> :
          <>
            {
              loadingSingIn
                ?
                <Spinner color={color.primary} size='sm' />
                :
                <FaGithub color={theme.color} />
            }
            Sign in with Github
          </>
      }

    </button>
  )
}


/*

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

*/
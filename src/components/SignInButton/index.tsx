import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi'

export function SignInButton() {
  const isUserSignedIn = true;

  return isUserSignedIn ? (
    <button type='button' className={styles.singInButton}>
      <FaGithub color='#04d361' />
      Manuel Molina
      <FiX color='#737380' className={styles.closeIcon} />

    </button>
  ) : (
    <button type='button' className={styles.singInButton}>
      <FaGithub color='#eba417' />
      Sign in with Github
    </button>
  )
}
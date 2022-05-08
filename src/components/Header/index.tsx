import { SignInButton } from '../SignInButton';
import styles from './style.module.scss';

//componente header
export function Header() {
  return (
    //header
    <header className={styles.headerContainer} >
      {/* conteúdos */}
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="logo" />

        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>

        <SignInButton />

      </div>
    </header>
  );
}
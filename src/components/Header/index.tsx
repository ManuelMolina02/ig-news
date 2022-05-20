import { ActiveLink } from '../ActiveLink';
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
          <ActiveLink href={'/'} activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>


          <ActiveLink href={'/posts'} activeClassName={styles.active} >
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />

      </div>
    </header>
  );
}
import { useTheme } from '../../contexts/theme';
import { themes } from '../../styles/theme';
import { ActiveLink } from '../ActiveLink';
import { ConfigsButton } from '../ConfigsButton';
import { SignInButton } from '../SignInButton';
import styles from './style.module.scss';

//componente header
export function Header() {

  const { theme, color } = useTheme()

  return (
    //header
    <header className={styles.headerContainer} style={{ backgroundColor: theme.bgPrimary }} >
      {/* conteúdos */}
      <div className={styles.headerContent} style={{ color: theme.color }}>

        <div className={styles.logo}> ig<span style={{ color: color.primary }}>.</span>news</div>

        <nav>
          <ActiveLink href={'/'} activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>


          <ActiveLink href={'/posts'} activeClassName={styles.active} >
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <div className={styles.signInBtn}>
          <SignInButton />
        </div>

        <ConfigsButton />

      </div>
    </header>
  );
}
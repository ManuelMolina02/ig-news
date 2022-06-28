
import { useTheme } from '../../contexts/theme';
import { ActiveLink } from '../ActiveLink';
import { SettignsButton } from '../SettignsButton';
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
          <ActiveLink title={'Home'} href={'/'} />
          <ActiveLink title={'Posts'} href={'/posts'} />
        </nav>

        <div className={styles.signInBtn}>
          <SignInButton />
        </div>

        <SettignsButton />

      </div>
    </header>
  );
}
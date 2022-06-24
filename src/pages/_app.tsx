import { AppProps } from 'next/app'
import { Header } from '../components/Header';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import '../styles/globals.scss';
import { DefineThemeProvider } from '../contexts/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DefineThemeProvider>
      <NextAuthProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </NextAuthProvider >
    </DefineThemeProvider>
  )
}
export default MyApp

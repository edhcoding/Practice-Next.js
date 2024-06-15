import '@/styles/global.css';
import Head from 'next/head';
import Image from 'next/image';
import Link from '@/components/Link';
import styles from '@/styles/App.module.css';
import logoImage from '@/public/logo.svg';
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '500'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shortit</title>
      </Head>
      <div className={`${styles.app} ${notoSansKR.className}`}>
        <header className={styles.header}>
          <nav className={`${styles.nav} ${styles.container}`}>
            <Link href="/">
              <Image width={93} height={26} src={logoImage} alt="Shortit" />
            </Link>
            <div className={styles.links}>
              <Link href="/short-links">주소 줄이기</Link>
              <Link href="/qrcodes">QR코드</Link>
            </div>
          </nav>
        </header>
        <main className={`${styles.main} ${styles.container}`}>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

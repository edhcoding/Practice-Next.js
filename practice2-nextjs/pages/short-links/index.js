import Head from 'next/head';
import Link from '@/components/Link';
import Button from '@/components/Button';
import styles from '@/styles/ShortLinkListPage.module.css';
import ShortLinkList from '@/components/ShortLinkList';

// 짧은 주소 목록을 확인하는 페이지
export default function ShortLinkListPage() {
  const shortLinks = [];

  return (
    <>
      <Head>
        <title>주소 줄이기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>주소 줄이기</h1>
          <Button as={Link} href="/short-links/new">
            새로 만들기
          </Button>
        </header>
        <ShortLinkList items={shortLinks} />
      </div>
    </>
  );
}

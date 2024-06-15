import Head from 'next/head';
import Link from '@/components/Link';
import Button from '@/components/Button';
import styles from '@/styles/QRCodeListPage.module.css';
import QRCodeList from '@/components/QRCodeList';

// QR코드 목록을 확인하는 페이지
export default function QRCodeListPage() {
  const qrCodes = [];

  return (
    <>
      <Head>
        <title>QRCode 만들기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>QRCode 만들기</h1>
          <Button as={Link} href="/qrcodes/new">
            새로 만들기
          </Button>
        </header>
        <QRCodeList items={qrCodes} />
      </div>
    </>
  );
}
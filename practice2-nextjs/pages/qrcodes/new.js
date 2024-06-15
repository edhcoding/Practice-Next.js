import Head from 'next/head';
import styles from '@/styles/QRCodeCreatePage.module.css';
import QRCodeForm from '@/components/QRCodeForm';

// QR코드를 생성하는 페이지
export default function QRCodeCreatePage() {
  return (
    <>
      <Head>
        <title>새 QRCode 추가 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>새 QRCode 추가</h1>
        <QRCodeForm />
      </div>
    </>
  );
}

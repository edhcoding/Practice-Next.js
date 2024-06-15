import Card from './Card';
import Link from './Link';
import Image from 'next/image';
import Button from './Button';
import QRCode from './QRCode';
import styles from './QRCodeList.module.css';
import linkIcon from '@/public/link.svg';
import formatDate from '@/lib/formatDate';
import calendarIcon from '@/public/calendar.svg';

// QR코드 목록을 보여주는 컴포넌트
function QRCodeItem({ value, onDelete }) {
  function handleDelete() {
    onDelete(value._id);
  }

  const { _id: id, title, url, updatedAt } = value;

  return (
    <Card className={styles.qrcodeItem}>
      <QRCode className={styles.qrcode} title={title} value={url} />
      <div className={styles.qrCodeItemContent}>
        <div className={styles.title}>{title}</div>
        <div className={styles.date}>
          <Image src={calendarIcon} alt="calendar" />
          {formatDate(updatedAt)}
        </div>
        <div className={styles.link}>
          <Image src={linkIcon} alt="link" />
          <Link variant="primary" href={value.url} target="_blank">
            {value.url}
          </Link>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button variant="outline" as={Link} href={`/qrcodes/${id}`}>
          수정
        </Button>
        <Button variant="minimal" onClick={handleDelete}>
          삭제
        </Button>
      </div>
    </Card>
  );
}

export default function QRCodeList({ items = [], onDelete }) {
  return (
    <ul className={styles.qrcodeList}>
      {items.map((item) => (
        <li key={item._id}>
          <QRCodeItem value={item} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}

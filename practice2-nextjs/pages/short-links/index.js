import { useState } from "react";
import Head from "next/head";
import Link from "@/components/Link";
import Button from "@/components/Button";
import styles from "@/styles/ShortLinkListPage.module.css";
import ShortLinkList from "@/components/ShortLinkList";
import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";

export async function getServerSideProps(context) {
  await dbConnect();
  const shortLinks = await ShortLink.find();
  return {
    props: {
      shortLinks: JSON.parse(JSON.stringify(shortLinks)),
      // shortLinks는 JS객체이므로 JSON객체로 바꿔 줘야함
      // 공식문서에 모델에 find메서드를 쓰면 return하는 클래스는 query라고 되어있음
      // 이 값을 JSON으로 바꾸려면 메서드나 지원하지 않는 값은 직접 없애줘야함
      // 먼저 JSON 문자열로 만들고 JSON.stringify(shortLinks)
      // 다시 파싱하는거임 JSON.parse(JSON.stringify(shortLinks))
    },
  };
}

// 짧은 주소 목록을 확인하는 페이지
export default function ShortLinkListPage({ shortLinks: initialShortLinks }) {
  const [shortLinks, setShortLinks] = useState(initialShortLinks);

  async function handleDelete(id) {
    await axios.delete(`/short-links/${id}`);
    setShortLinks((prevShortLinks) =>
      prevShortLinks.filter((shortLink) => shortLink._id !== id)
    );
  }

  return (
    <>
      <Head>
        <title>주소 줄이기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>주소 줄이기</h1>
          <Button as={Link} href="/short-links/new">
            {/* variant 지정안해서 기본 스타일인 primary로 적용됨 */}
            새로 만들기
          </Button>
        </header>
        <ShortLinkList items={shortLinks} onDelete={handleDelete} />
      </div>
    </>
  );
}

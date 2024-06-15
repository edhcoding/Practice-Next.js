import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import styles from "@/styles/ShortLinkCreatePage.module.css";
import ShortLinkForm from "@/components/ShortLinkForm";

// 짧은 주소를 생성하는 페이지
export default function ShortLinkCreatePage() {
  const router = useRouter();

  async function handleSubmit(values) {
    await axios.post("/short-links/", values);
    router.push("/short-links/");
  }

  return (
    <>
      <Head>
        <title>새 URL 추가 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>새 URL 추가</h1>
        <ShortLinkForm onSubmit={handleSubmit} />
      </div>
    </>
  );
}

import Head from "next/head";
import { useRouter } from "next/router";
import ShortLinkForm, { ShortLinkFormType } from "@/components/ShortLinkForm";
import styles from "@/styles/ShortLinkEditPage.module.css";
import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";

// 수정을하려면 기본값이 보여야하므로 서버사이드 렌더링해줘야함
export async function getServerSideProps(context) {
  const { id } = context.query;
  await dbConnect();
  const shortLink = await ShortLink.findById(id);
  // DB에서 도큐먼트 가져오고
  if (shortLink) {
    // 해당하는 도큐먼트가 있다면 props로 내려주고
    return {
      props: {
        shortLink: JSON.parse(JSON.stringify(shortLink)),
      },
    };
  }

  return {
    // 없으면 404페이지 보이게함
    notFound: true,
  };
}

// 짧은 주소를 수정하는 페이지
export default function ShortLinkEditPage({ shortLink }) {
  const router = useRouter();
  const { id } = router.query;

  async function handleSubmit(values) {
    // 클라이언트쪽에서 실행되는 코드이므로 당연히 DB에 곧바로 접근 불가능하므로 axios사용!
    await axios.patch(`/short-links/${id}`, values);
    router.push("/short-links/");
  }

  return (
    <>
      <Head>
        <title>주소 수정하기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>수정하기</h1>
        <ShortLinkForm
          type={ShortLinkFormType.Edit}
          initialValues={shortLink}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";

export async function getSeverSideProps(context) {
  const { shortUrl } = context.query;
  // shortUrl을 가지고 mongoDB에서 도큐먼트 가져올 거임
  await dbConnect();
  const shortLink = await ShortLink.findOne({ shortUrl });
  // findOne이라는 함수로 도큐먼트를 가져올거임, 인수로 도큐먼트를 찾을 조건을 객체로 만들어 넣어줄 거임
  if (shortLink) {
    // 만약 해당하는 도큐먼트 값이 있다면 반환값으로 redirect할거임
    return {
      redirect: {
        destination: shortLink.url,
        permanent: false,
      },
    };
  }

  return {
    notFound: true,
  };
}

export default function ShortUrlPage() {
  return null;
}

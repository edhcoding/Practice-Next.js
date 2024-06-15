import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";
import createShortURL from "@/lib/createShortURL";

// api폴더 안의 파일의 경로가 곧 엔드포인트 경로가 됨
// 이 함수는 Next.js 서버에 /api/short-links라는 경로로 리퀘스트가 들어올 때 실행할 함수임
// 매개변수로 request, response 두 파라미터가 있는데 이걸 이용해서 리퀘스트를 참조하거나 리스폰스를 보낼 수 있음
export default async function handler(req, res) {
  await dbConnect();
  // connection이 잘 되었는지 확인하기 위해서 mongoose의 connection.readyState를 콘솔에 출력
  // 개발 모드키고 이 엔드포인트에 아무 리퀘스트 보내보면 연결잘 됐는지 확인가능
  // console.log(mongoose.connection.readyState);

  // 이번에는 모델확인
  // console.log(ShortLink);

  // response 객체는 사용법 특이함 => 함수를 메서드 체이닝(method chaining)이라는 방식으로 사용함
  // response 객체는 점 표기법으로 메서드를 사용하는데 줄줄이 이어서 또 메서드를 사용함 => 메서드 체이닝
  // 쉽게말해 메서드의 리턴값이 response 객체 그 자체여서 이렇게 쓸 수 있음
  // 자바스크립트 객체를 아규먼트로 전달하면 Content-Type header도 알아서 보내 줌
  switch (req.method) {
    case "POST":
      // POST 리퀘스트로 리퀘스트 body를 보내면 새로운 shortLink document를 만듬
      const { title, url } = req.body;
      const shortUrl = createShortURL(url);
      const shortLink = await ShortLink.create({
        title,
        url,
        shortUrl,
      });
      res.status(201).send(shortLink);
      break;

    case "GET":
      // GET 리퀘스트를 보내면 모든 shortLink document를 보내줌
      const shortLinks = await ShortLink.find();
      res.send(shortLinks);
      break;

    default:
      res.status(404).send();
      break;
  }
}

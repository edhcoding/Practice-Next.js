import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";

export default async function handler(req, res) {
  // request 객체는 리퀘스트에 대한 정보를 가져올 때 사용함
  // 다이나믹 라우트의 params값고 쿼리스트링을 가져올 수 있음 => res.send(req.query); (params, 쿼리스트링 같은 객체 안에 있음)
  // GET http://localhost:3000/api/short-links/123?q=codeit => {"q": "codeit", "id": "123"}
  // body 참조 가능 => req.body
  // 리퀘스트로 오는 쿠키값을 확인가능
  // 쿠기에는 간단한 사용자 정보, 로그인 하고난 후 인증정보 같은거 브라우저에 저장 하는 용도로
  // 리퀘스트 할 때마다 보내 주는 식으로 활용 => req.cookies
  // method 다뤄볼거임 => req.method
  // method 마다 다른 처리 하고 싶다면 switch case문 활용!

  // id값으로 도큐먼트 조회해보자
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case "PATCH":
      res.send("ShortLink 수정");
      break;
    case "GET":
      const shortLink = await ShortLink.findById(id);
      res.send(shortLink);
      break;
    default:
      res.send();
      break;
  }
}

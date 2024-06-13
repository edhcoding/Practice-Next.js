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
      // PATCH리퀘스트로 리퀘스트 바디 보내면 도큐먼트 수정할 거임
      // 수정은 findByIdAndUpdate 함수 사용하면 됨
      // 첫 아규먼트로는 도큐먼트 id 넘겨주고
      // 두번째 아규먼트로는 업데이트할 데이터를 객체로 전달 (req.body)
      // 세번째 아규먼트로를 안넣고 PATCH 리퀘스트 보내면 이전값이 같게 나옴 왜냐하면 findByIdAndUpdate함수의
      // 리턴값은 수정하기 이전의 도큐먼트 값이기 때문에 세번째 아규먼트로 { new: true } 넣어줌 그럼 업데이트된 도큐먼트 출력됨
      const updateShortLink = await ShortLink.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.send(updateShortLink);
      break;
    case "GET":
      const shortLink = await ShortLink.findById(id);
      res.send(shortLink);
      break;
    case "DELETE":
      // 삭제할때는 findByIdAndDelete함수를 사용하고 인수로 id값을 넣어줌
      // 리스폰스로는 빈 값을 넣어 줌
      // 여기서 하나만 더 수정하자면 보통 데이터를 삭제하면 상태코드로 204 No Content를 보내주는데
      // 그래서 status 함수로 204를 보내줌
      await ShortLink.findByIdAndDelete(id);
      res.status(204).send();
      break;
    default:
      res.send();
      break;
  }
}

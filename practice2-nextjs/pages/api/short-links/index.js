import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";
import mongoose from "mongoose";

// api폴더 안의 파일의 경로가 곧 엔드포인트 경로가 됨
// short-links.js 이 엔드포인트는 짧은 주소 데이터를 다루는데 사용할 거임

export default async function handler(req, res) {
  // 엔드포인트 테스트 dbConnet함수를 호출해서 connection을 만들고 이때 handler 함수에
  // async await 함수를써서 connection 기다리기!
  await dbConnect();
  // connection이 잘 되었는지 확인하기 위해서 mongoose의 connection.readyState를 콘솔에 출력
  // 개발 모드키고 이 엔드포인트에 아무 리퀘스트 보내보면
  // console.log(mongoose.connection.readyState);

  // 이번에는 모델확인
  console.log(ShortLink);

  // 이 함수는 Next.js 서버에 /api/short-links라는 경로로 리퀘스트가 들어올 때 실행할 함수임
  // 함수 안에는 request, response 두 파라미터가 있는데 이걸 이용해서 리퀘스트를 참조하거나 리스폰스를 보낼 수 있음

  // response 객체는 사용법 특이함 => 함수를 메서드 체이닝(method chaining)이라는 방식으로 사용함
  // response 객체는 점 표기법으로 메서드를 사용하는데 줄줄이 이어서 또 메서드를 사용함 => 메서드 체이닝
  // 쉽게말해 메서드의 리턴값이 response 객체 그 자체여서 이렇게 쓸 수 있음
  // 자바스크립트 객체를 아규먼트로 전달하면 Content-Type header도 알아서 보내 줌
  switch (req.method) {
    case "POST":
      // POST 리퀘스트와 리퀘스트 바디를 보내면 ShortLink모델로 DB에 저장하고
      // GET 리퀘스트를 보내면 DB에 있는 ShortLink 모델을 리스폰스로 보내도록 할거임
      // 데이터를 생성할때는 mongoose의 create 메서드를 사용
      // req.body에는 다양한 값들이 들어올 수 있지만 mongoose에서는 우리가 만들어 둔 스키마에 맞지 않는
      // 데이터는 무시하기 때문에 이렇게 작성해도 무방함
      // DB에 저장하는 작업은 비동기이기 때문에 await로 기다려주고 이렇게 생성한 도큐먼트를 리스폰스로 보내줌
      const newShortLink = await ShortLink.create(req.body);
      res.status(201).send(newShortLink);
      break;
    case "GET":
      // 도큐먼트 여러개 가져오도록 해보자
      const shortLinks = await ShortLink.find();
      res.send(shortLinks);
      break;
    default:
      res.status(404).send();
  }
}

// api폴더 안의 파일의 경로가 곧 엔드포인트 경로가 됨
// short-links.js 이 엔드포인트는 짧은 주소 데이터를 다루는데 사용할 거임

export default function handler(req, res) {
  // 이 함수는 Next.js 서버에 /api/short-links라는 경로로 리퀘스트가 들어올 때 실행할 함수임
  // 함수 안에는 request, response 두 파라미터가 있는데 이걸 이용해서 리퀘스트를 참조하거나 리스폰스를 보낼 수 있음

  // response 객체는 사용법 특이함 => 함수를 메서드 체이닝(method chaining)이라는 방식으로 사용함
  // response 객체는 점 표기법으로 메서드를 사용하는데 줄줄이 이어서 또 메서드를 사용함 => 메서드 체이닝
  // 쉽게말해 메서드의 리턴값이 response 객체 그 자체여서 이렇게 쓸 수 있음
  // 자바스크립트 객체를 아규먼트로 전달하면 Content-Type header도 알아서 보내 줌
  switch (req.method) {
    case "POST":
      res.status(201).send({
        title: "위키피디아 Next.js",
        url: "https://en.wikipedia.org/wiki/Next.js",
      });
      break;
    case "GET":
      res.send([
        {
          id: "abc",
          title: "위키피디아 Next.js",
          url: "https://en.wikipedia.org/wiki/Next.js",
        },
        {
          id: "def",
          title: "코드잇 자유게시판",
          url: "https://codeit.kr/community/general",
        },
        {
          id: "ghi",
          title: "코드잇 질문답변",
          url: "https://codeit.kr/community/questions",
        },
      ]);
      break;
    default:
      res.status(404).send();
  }
}

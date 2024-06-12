// api폴더 안의 파일의 경로가 곧 엔드포인트 경로가 됨
// short-links.js 이 엔드포인트는 짧은 주소 데이터를 다루는데 사용할 거임

export default function handler(req, res) {
  // 이 함수는 Next.js 서버에 /api/short-links라는 경로로 리퀘스트가 들어올 때 실행할 함수임
  // 함수 안에는 request, response 두 파라미터가 있는데 이걸 이용해서 리퀘스트를 참조하거나 리스폰스를 보낼 수 있음
  res.send("안녕 API");
}

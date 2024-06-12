/** MongoDB 소개
 * 데이터베이스를 알기전에 데이터 먼저 알아야 함
 * 데이터 - 데이터는 정보를 컴퓨터가 이해할 수 있는 형태로 저장해 놓은 정보
 * 
 * 상품 목록, 리뷰 목록, 찜 목록, 회원 데이터 등등을 JS 변수에 저장해놓고 백엔드 서버가 꺼졌다 켜지면 데이터 다 잃음
 * 이럴때 사용하는게 데이터베이스라는 프로그램
 * 백엔드 서버와는 별도로 데이터 베이스를 만들어 놓으면 데이터를 관리하기도 서버랑 데이터베이스 개수를 늘리기도 좋음
 * 
 * 데이터베이스 - 데이터를 따로 저장하고 관리하는 프로그램
 * 우리는 MongoDB를 사용할 거임
 * 데이터베이스에는 SQL, NoSQL등 여러가지 종류가 있음 => MongoDB는 NoSQL임
 * MongoDB에 저장하는 데이터는 도규먼트(Document)라고 부름 => 도규먼트는 쉽게말해 JS 객체 같은거라고 생각
 * 앞에서 말한 예시에서 상품 목록 데이터는 상품 목록 데이터끼리 이렇게 도규먼트를 모아 놓은 걸 컬렉션(collection)이라 함
 * 
 * 이번 챕터에서는 MongoDB Atlas라는 서비스를 이용해서 클라우드에 MongoDB 데이터베이스를 생성할 거고
 * Mongoose라는 JS 라이브러리로 서버에서 MongoDB를 다뤄볼거임
 */

/** 환경변수 사용하기 (https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
 * 환경변수 (Environement Variable) 
 * 환경 변수는 프로그램에서 실행 환경에 따라 다른 값을 지정할 수 있는 변수임
 * 하나의 코드로 실행하는데 수많은 서버와 데이터베이스를 연결할 수 있음 코드 상에는 MONGODB_URI 와 같은 값으로 
 * 데이터베이스 주소를 지정해 두고, 각 서버를 실행할 때마다 다른 데이터베이스 주소를 넣어 주면 됨
 * Node.js 환경에서는 이런 환경 변수들을 process.env라는 객체를 통해서 참조할 수 있음
 * 
 * Next.js에서 환경 변수 추가하기 (https://www.npmjs.com/package/dotenv)
 * npm install dotenv
 * Next.js에서는 기본적으로 dotenv라는 라이브러리를 지원함
 * 이 라이브러리는 .env 같은 이름의 파일에서 환경 변수들을 저장해 두면, Node.js 프로젝트를 실행할 때 환경 변수로
 * 지정해 주는 라이브러리임
 * 이때 주의할 점은 .env 파일 같은 건 소스 코드에 포함시키면 안됨!
 * Next.js 프로젝트에서는 기본적으로 dotenv 설정이 되어 있음 .env.local 같은 파일을 추가하면 쉽게 환경 변수를 추가할 수 있음
 * 
 * 예시
 * .env.local
 * MONGODB_URI=mongodb+srv://admin:blahblah@.clusterName.blahblah.mongodb.net/databaseName?retryWrites=true&w=majority
 * 이렇게 추가한 값을 process.env.MONGODB_URI 로 참조할 수 있음
 * 
 * Next.js에서 사용하는 특별한 환경 변수
 * 만약에 환경 변수가 웹 사이트에 노출되는 사고를 막기 위해서 Next.js에서는 클라이언트 사이드에서 사용하는
 * 환경 변수에 특별한 접두사(prefix)를 사용한다 , NEXT_PUBLIC_ 이라고 이름을 붙이면 이 환경 변수는
 * 클라이언트 사이드에서도 사용할 수 있음
 * ex) 클라이언트 사이드에서 현재 사이트의 호스트 주소를 저장해 두고 참조하고 싶다면
 * 이와 같이 NEXT_PUBLIC_HOST 라는 이름으로 사용하면 됩니다.
 * 
 * 예시
 * MONGODB_URI=mongodb+srv://admin:blahblah@cluster0.blahblah.mongodb.net/databaseName?retryWrites=true&w=majority
 * NEXT_PUBLIC_HOST=http://localhost:3000
 */
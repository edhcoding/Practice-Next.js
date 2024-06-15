import { createHmac } from 'crypto';

// createShortURL이라는 함수는 짧은 주소를 만드는 함수로 shortLink 도큐먼트를 생성할때 짧은 주소를 함께 저장함
// Node.js에서 제공하는 암호화 패키지에서 현재 주소를 sha256 hash로 만든 다음에 처음 여섯 자리만 사용하도록 만듬
export default function createShortURL(url) {
  // 이 함수는 hash값을 만들때 shortit이라는 문자열을 key로 사용하고 있음 (우리가 원하는 문자열 or 환경변수 이용해서 사용가능)
  // Date.now()는 표준시부터 지금 시간까지 걸린 밀리초 반환
  const hash = createHmac('sha256', 'shortit')
    .update(url + Date.now())
    .digest('hex');
  return hash.slice(0, 6);
  // slice메서드는 0번째 인덱스부터 5번째까지 추출 
}

/** 코드해석 (GPT)
 * 이 코드는 URL을 입력으로 받아 고유한 단축 URL을 생성하는 JavaScript 코드입니다. 
 * 주요 작업은 URL에 현재 시간(밀리초 단위)을 더해 HMAC 해시를 생성하고, 그 해시의 앞부분을 잘라내어 
 * 고유한 식별자를 만드는 것입니다. 이 식별자는 원래의 URL을 대신하여 사용할 수 있는 짧은 문자열입니다.
 * 
 * ※ Hash(해시)
 * 단방향 암호화 기법 중 하나인 해쉬 알고리즘을 이용해서 일정한 길이의 암호화된 문자열을 생성하는 일을 Hashing이라고 하고,
 * 그 Hashing 이후의 값을 Hash 값, Hash 값을 만들어내는 함수를 Hash 함수라고 합니다.
 * Hash라고 하면 대략 Hash 알고리즘을 이용한 암호화라고 이해하면 될거 같아요.
 * 
 * ※ HMAC(Hash based Message Authentication Code)
 * HMAC에서 MAC는 메세지를 주는 사람과 받는 사람 사이에 그 메세지가 변형되지는 않았는지 확인하는 방법(변조 여부)으로 앞에 "H"가 붙으면 Hash 알고리즘을 이용한다는 뜻입니다. 
 * 
 * 해시함수 - 임의의 길이의 데이터를 고정된 길이의 데이터로 매핑하는 함수.
 * 해시 함수를 사용하면 데이터양이 많아져도 일괄된 성능을 보장하는 구조로 설계할 수 있고, 민감한 데이터의 변조를 막을 수 있다.
 * 알고리즘엔 md5, sha1, sha256, sha512 등을 사용할 수 있음
 * sha256은 해시 값 길이를 64개 가진다 (sha512가 더 강력하긴 함 256을 더 많이 사용하기는 함)
 * 
 * update(data[,inputEncoding]): 변환할 문자열을 입력한다.
 * digest 인코딩 방식은 base64나 hex를 쓰는 게 좋을 듯하고 실제로 base64가 해시값이 짧아서 많이 애용한다곤 한다.
 * 
 * 예시
const string = 'this is my password'
(string 변수 안에 사용할 비밀번호를 입력 받는다)

//1. 단순 해싱으로 비밀번호 해싱 (사용할 해시함수를 선택한다 위의 코드에서는 "sha512" 방식을 선택 하였다.)
let hashAlgorithm = crypto.createHash('sha512'); // sha512 암호 알고리즘 사용

//선택된 알고리즘으로 해싱 (선택한 해시함수와 나의 비밀번호를 해싱하는 과정을 실행한다.)
let hashing = hashAlgorithm.update(string);
      
//표시할 인코딩 설정. ("base64"로의 인코딩 된 digest 코드를 만들어 낸다. )
let hashedString = hashing.digest('base64');
 */

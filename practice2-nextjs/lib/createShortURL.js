import { createHmac } from 'crypto';

// 짧은 주소를 만드는 함수
// Node.js에서 제공하는 암호화 패키지에서 현재 주소를 sha256 hash로 만든 다음에 처음 여섯 자리만 사용하도록 만듬
export default function createShortURL(url) {
  const hash = createHmac('sha256', 'shortit')
    .update(url + Date.now())
    .digest('hex');
  return hash.slice(0, 6);
}

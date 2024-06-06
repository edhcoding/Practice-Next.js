/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 기능: 엄격 모드를 활성화하여 더 나은 개발 경험과 오류 발견
  // 효과: 콘솔에 경고 메시지를 표시하고, 잠재적인 문제를 사전에 파악할 수 있습니다.
  async redirects() {
    // 비동기 함수: redirects 함수는 비동기로 정의되어 있고 데이터를 가져오거나 비동기 작업을 수행할 수 있습니다.
    // 리디렉션 규칙: 배열 형태로 여러 리디렉션 규칙을 반환합니다.
    return [
      {
        source: "/products/:id",
        destination: "/items/:id",
        permanent: true,
        /**
         * source: 리디렉션의 출발 경로를 지정합니다. :id는 와일드카드로, 임의의 값이 올 수 있습니다.
         * destination: 리디렉션의 도착 경로를 지정합니다. source 경로의 :id 값을 그대로 받아 사용할 수 있습니다.
         * permanent: 리디렉션이 영구적인지 여부를 나타냅니다.
         * true로 설정하면 HTTP 상태 코드 301을 반환하며, 검색 엔진에 이 리디렉션이 영구적임을 알립니다.
         * false로 설정하면 HTTP 상태 코드 302를 반환하여 임시 리디렉션임을 나타냅니다.
         */
      },
    ];
  },
};

export default nextConfig;

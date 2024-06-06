/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 기능: 엄격 모드를 활성화하여 더 나은 개발 경험과 오류 발견
  // 효과: 콘솔에 경고 메시지를 표시하고, 잠재적인 문제를 사전에 파악할 수 있습니다.
  async redirects() {
    // 리다이렉트를 사용할때는 코드를 외우기 어렵기 때문에 공식문서 참조 https://nextjs.org/docs/pages/api-reference/next-config-js/redirects
    // 비동기 함수: redirects 함수는 비동기로 정의되어 있고 데이터를 가져오거나 비동기 작업을 수행할 수 있습니다.
    // 리디렉션 규칙: 배열 형태로 여러 리디렉션 규칙을 반환합니다.
    return [
      {
        source: "/products/:id",
        destination: "/items/:id",
        permanent: true,
        /**
         * source: 리디렉트 처리할 주소 /products/:id
         * destination: 이동시킬 주소 items/:id
         * permanent: response status code 정하는 것임, 웹 브라우저에게 주소가 바뀌었다는것을 저장하게 하려면 true 아니면 false
         * true로 설정하면 HTTP 상태 코드 308을 반환하며, 검색 엔진에 이 리디렉션이 영구적임을 알립니다.
         * false로 설정하면 HTTP 상태 코드 307를 반환하여 임시 리디렉션임을 나타냅니다.
         * 참고자료: https://velog.io/@himprover/Nextjs-Redirect-%EC%98%B5%EC%85%98%EC%97%90-Permanent%EB%8A%94-%EB%AD%90%EC%A7%80
         */
      },
    ];
  },
};

export default nextConfig;

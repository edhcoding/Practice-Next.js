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
  images: {
    // 이 설정값은 우리가 사용할 외부 이미지 주소를 미리 next.js 서버에 알려주는 거임
    // Image 컴포넌트를 public에 있는 이미지 아닌 외부 이미지 사용해서 사용하면 오류가 나올때 설정하는 거임
    // Unhandled Runtime Error 이러한 오류가 나옴
    // Error: Invalid src prop (https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/codeitmall/product-09.png) on `next/image`,
    // hostname "learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com" is not configured under images in your `next.config.js`
    // See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host
    // 위 오류에서 나오는 오류에 맞춰서 아래 작성하면 됨
    remotePatterns: [
      {
        protocol: "https",
        hostname: "learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com",
        // hostname은 도메인을 포함한 앞쪽의 주소를 작성
        port: "",
        pathname: "/codeitmall/**",
        // ** 별2개를 작성하면 뒤쪽에 있는 모든 경로를 포함함
      },
    ],
  },
};

export default nextConfig;

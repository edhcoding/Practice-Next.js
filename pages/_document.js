import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      {/* 처음에 en 인데 한국어 사용 할거니까 ko로 변경 */}
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

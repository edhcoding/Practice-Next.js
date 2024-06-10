import Head from "next/head";
import Header from "@/components/Header";
import Container from "@/components/Container";
import { ThemeProvider } from "@/lib/ThemeContext";
import "@/styles/global.css";
// 전체 css를 적용하려면 _app.js폴더에 css 임포트 하면 됨

// import { Noto_Sans_KR } from "@next/font/google";

// const notoSansKR = Noto_Sans_KR({
//   weight: ["400", "700"],
//   // 문자열로 굵기 지정해줘야 함
//   subsets: ["korean"],
//   // 서브셋은 폰트에서 영문, 한글 이런 식으로 사용할 글자들만 골라서 사용할 때 쓰는 거임
//   // 일단 빈 배열을 작성함으로써 전부 다 사용하는 걸로 했습니다.
//   // 만약에 영문만 사용하는 폰트라면 ['latin']과 같이 써 주면 됩니다.
// });

export default function App({ Component, pageProps }) {
  // component는 현재 렌더링되고 있는 페이지를 나타냄
  // pageProps는 해당 페이지에 전달되고있는 props를 나타냄

  return (
    <>
      <Head>
        <title>Codeitmall</title>
        <link rel="icon" href="/public/favicon.ico" />
        {/* 모든 페이지 적용하고 싶다면 _app.js 파일에 작성 */}
      </Head>
      <ThemeProvider>
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  );
}

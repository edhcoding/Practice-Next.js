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
          {/* _app.js에서는 Next프레임워크에서 내려주는 Component와 pageProps를 받을 수 있다.
          이를 통해 각 페이지마다 getServerSideProps, getStaticProps, getStaticPath, getLayout 등을 설정하는데에 쓸 수 있다. */}
          {/* Component: 이는 현재 라우트에 해당하는 실제 페이지 컴포넌트를 가리킨다.
          예를 들어, 사용자가 `/about`에 접속하면, Next.js는 `pages/about.js`에 정의된 컴포넌트를 Component로 넘겨준다. */}
          {/* pageProps: 이는 각 페이지 컴포넌트가 서버 사이드 또는 정적 생성 과정에서 가져온 초기 프로퍼티를 포함한다.
          getServerSideProps, getStaticProps 등에서 반환된 객체가 pageProps로 전달된다. */}
        </Container>
      </ThemeProvider>
    </>
  );
}

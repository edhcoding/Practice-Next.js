import "@/styles/global.css";
// .. 사용해서 상대경로를 사용했는데 @쓰면 프로젝트 최상위 폴더를 기준으로 경로 쓸 수 있음(alias)

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

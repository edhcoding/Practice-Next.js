import "@/styles/global.css";
// 전체 css를 적용하려면 _app.js폴더에 css 임포트 하면 됨

export default function App({ Component, pageProps }) {
  // component는 현재 렌더링되고 있는 페이지를 나타냄
  // pageProps는 해당 페이지에 전달되고있는 props를 나타냄
  return <Component {...pageProps} />;
}

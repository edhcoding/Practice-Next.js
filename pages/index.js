import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "@/lib/axios";
import styles from "@/styles/Home.module.css";
import SearchForm from "@/components/SearchForm";
import ProductList from "@/components/ProductList";

export async function getStaticProps() {
  // 이 코드는 정적 생성할 때 next.js가 실행할 함수를 구현한 거임 - 정적 생성 (static generation)
  // 이름을 getStaticProps로 하고 export해주면 next.js가 정적생성할때 이 함수를 실행시켜줌
  const res = await axios.get("/products");
  const products = res.data.results;

  return {
    // getStaticProps함수는 prop으로 내려줄 값을 만드는 함수임
    // props 안에 있는 products를 페이지에 props로 내려준다고 생각하면 됨
    props: {
      products,
    },
  };
}

/**
 * npm run build 해서 pages에 있는 index.html <script id= "__NEXT_DATA__" 이쪽보면
 * (Hydration) - 참고로 이미 렌더링된 HTML과 리액트의 데이터를 연결하는 작업을 Hydration 이라 함
 * pageProps라는 값으로 객체가 들어가 있음 웹 브라우저가 리액트가 로딩할 때 Hydration하면서 여기 있는 객체를
 * prop으로 쓰는 용도 임 빌드 시점에 HTML을 렌더링하면서 pageProps를 만들어서 script 태그에 넣어두고
 * 웹 브라우저가 이 페이지를 로딩하면 이 pageProps 값을 활용해서 현재 화면에 보이는 HTML과 리액틀의
 * virtual dom 상의 컴포넌트를 동기화하게 됨
 */

/** 정리
 * next.js는 우리가 아무것도 안해도 기본으로 정적 생성을 해주고 만약에 정적 생성을 하면서
 * 데이터를 가져와서 쓰고 싶다면 getStaticProps라는 함수를 만들고 export한 다음에 이 함수에서
 * 리턴값으로 props를 만들어주고 이 prop은 page 컴포넌트에서 가져와 쓰면 됨
 */

export default function Home({ products }) {
  // const [products, setProducts] = useState([]); // 상품

  // // 상품 데이터 가져오기
  // async function getProducts() {
  //   const res = await axios.get("/products");
  //   const nextProducts = res.data.results;
  //   // results: product[] => 리턴된 상품 객체 목록
  //   setProducts(nextProducts);
  // }

  // // 화면이 렌더링 되자마자 getProducts() 비동기로 실행
  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <>
      <Head>
        {/* html에서 title작성하듯이 작성안하고 next에서는 Head 컴포넌트로 각 페이지 마다 설정 가능함 */}
        {/* Head 태그 안에 link태그로 이미지(파비콘) 넣을 수 있음 */}
        <title>Codeitmall</title>
      </Head>
      <SearchForm />
      <ProductList className={styles.products} products={products} />
    </>
  );
}

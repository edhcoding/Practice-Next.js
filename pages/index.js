import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "@/lib/axios";
import styles from "@/styles/Home.module.css";
import SearchForm from "@/components/SearchForm";
import ProductList from "@/components/ProductList";

export default function Home() {
  const [products, setProducts] = useState([]); // 상품

  // 상품 데이터 가져오기
  async function getProducts() {
    const res = await axios.get("/products");
    const nextProducts = res.data.results;
    // results: product[] => 리턴된 상품 객체 목록
    setProducts(nextProducts);
  }

  // 화면이 렌더링 되자마자 getProducts() 비동기로 실행
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
    <Head>
      {/* html에서 title작성하듯이 작성안하고 next에서는 Head 컴포넌트로 각 페이지 마다 설정 가능함 */}
      {/* Head 태그 안에 link태그로 이미지(파비콘) 넣을 수 있음 */}
      <title>
        Codeitmall
      </title>
    </Head>
      <SearchForm />
      <ProductList className={styles.products} products={products} />
    </>
  );
}

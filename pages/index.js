import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Container from "@/components/Container";
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
      <Header />
      <Container>
        <SearchForm />
        <ProductList className={styles.products} products={products} />
      </Container>
    </>
  );
}

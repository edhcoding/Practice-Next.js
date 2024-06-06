import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import styles from "@/styles/Search.module.css";
import Header from "@/components/Header";
import Container from "@/components/Container";
import SearchForm from "@/components/SearchForm";
import ProductList from "@/components/ProductList";

export default function Search() {
  const [products, setProducts] = useState([]);

  const router = useRouter();
  const { q } = router.query;
  // 쿼리스트링 값 가져오기

  async function getProducts(query) {
    const res = await axios.get(`/products/?q=${query}`);
    const nextProducts = res.data.results;
    setProducts(nextProducts);
  }

  useEffect(() => {
    getProducts(q);
  }, [q]);

  return (
    <div>
      <Header />
      <Container>
        <SearchForm initialValue={q} />
        <h2 className={styles.title}>
          <span className={styles.keyword}>{q}</span> 검색 결과
        </h2>
        <ProductList className={styles.productList} products={products} />
        {/* prop으로 styles.productList를 내려보내주는데 ProductList안에 Link컴포넌트안에 styles.product가
        있기 때문에 productList뿐만아니라 product까지 css가 적용이된다! */}
      </Container>
    </div>
  );
}

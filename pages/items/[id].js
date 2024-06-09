import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "@/lib/axios";
import styles from "@/styles/Product.module.css";
import Header from "@/components/Header";
import Container from "@/components/Container";
import StarRating from "@/components/StarRating";
import SizeReviewList from "@/components/SizeReviewList";

export default function Product() {
  const [product, setProduct] = useState();
  const [sizeReviews, setSizeReviews] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  async function getProduct(targetId) {
    const res = await axios.get(`/products/${targetId}`);
    const nextProduct = res.data;
    setProduct(nextProduct);
  }

  async function getSizeReviews(targetId) {
    const res = await axios.get(`/size_reviews/?product_id=${targetId}`);
    const nextSizeReviews = res.data.results ?? [];
    setSizeReviews(nextSizeReviews);
  }

  useEffect(() => {
    if (!id) return;

    getProduct(id);
    getSizeReviews(id);
  }, [id]);

  if (!product) return null;

  return (
    <>
      <Header />
      <Container>
        <h1 className={styles.name}>
          {product.name}
          <span className={styles.englishName}>{product.englishName}</span>
        </h1>
        <div className={styles.content}>
          <div className={styles.image}>
            <Image fill src={product.imgUrl} alt={product.name} />
            {/* HTML에서 제공하는 img태그를 사용하는 것 보다 next.js에서 제공하는 Image 컴포넌트를 쓰면 쉽게 이미지 최적화가 가능함 */}
            {/* public에 넣은 사진은 홈페이지에서 /product.jpeg로 접근 가능함 */}

            {/* Image 컴포넌트 사용하면 url 주소도 다르고 w, q 값이 생겨있음 */}
            {/* Next의 Image 컴포넌트 사용하면 이미지 원본을 바로 사용하는 것이 아니라 next.js 서버를 한 번 거쳐서
             최적화 된 크기의 이미지를 가져옴 */}
            {/* lazy 로딩 기능을 기본 제공함 - 페이지 초기 로딩 속도 빨라짐 */}
            {/* 주의! 한가지 지켜야 할 점 - 이미지 크기 지정해야함(width, height 지정 안하면 오류!)
             하지만 항상 이미지 크기를 지정할 수 있는건 아니기 때문에 유연하게 크기를 지정하는 방법도 지원함!
             fill 속성 사용 - 그냥 fill 만 쓰면 되는데 fill 속성은 조상요소를 꽉 채우는 기능을 함 이때 조상은 포지셔닝된 요소여야 함 */}
            {/* 
            <div style={{ position: "relative", width: "50%", height: "200px" }}>
              <Image fill src="/images/product.jpeg" alt="상품 이미지" />
            </div> 이런 식으로 사용하는데 이미지 비율이 깨지는데 비율을 유지하면서 사용하고 싶다면
            Image 컴포넌트 안에다가 objectFit(object-fit) 이라는 css속성을 적용하면됨 */}
          </div>
          <div>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>제품 정보</h2>
              <div className={styles.info}>
                <table className={styles.infoTable}>
                  <tbody>
                    <tr>
                      <th>브랜드 / 품번</th>
                      <td>
                        {product.brand} / {product.productCode}
                      </td>
                    </tr>
                    <tr>
                      <th>제품명</th>
                      <td>{product.name}</td>
                    </tr>
                    <tr>
                      <th>가격</th>
                      <td>
                        <span className={styles.salePrice}>
                          {product.price.toLocaleString()}원
                        </span>{" "}
                        {product.salePrice.toLocaleString()}원
                      </td>
                    </tr>
                    <tr>
                      <th>포인트 적립</th>
                      <td>{product.point.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <th>구매 후기</th>
                      <td className={styles.starRating}>
                        <StarRating value={product.starRating} />{" "}
                        {product.starRatingCount.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <th>좋아요</th>
                      <td className={styles.like}>
                        ♥{product.likeCount.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>사이즈 추천</h2>
              <SizeReviewList sizeReviews={sizeReviews ?? []} />
            </section>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>사이즈 추천하기</h2>
            </section>
          </div>
        </div>
      </Container>
    </>
  );
}

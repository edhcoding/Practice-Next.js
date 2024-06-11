import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "@/lib/axios";
import styles from "@/styles/Product.module.css";
import StarRating from "@/components/StarRating";
import SizeReviewList from "@/components/SizeReviewList";
import Spinner from "@/components/Spinner";

export async function getStaticPaths() {
  // getStaticPaths: pages/**/[id].tsx 형태의 동적 라우팅 페이지 중, 빌드 시에 static하게 생성할 페이지를 정함
  // 동적 경로를 사용하는 페이지에서 getStaticPaths라는 함수를 사용할 때 Next.js는 getStaticPaths에 지정된 모든 경로를 정적으로 미리 렌더링한다.
  // getStaticProps 함수먼저 작성하고 getStaticPaths로 넘어 옴
  // getStaticPaths함수는 다이나미한 페이지를 정적 생성할 때 어떤 페이지를 생성하는지 정해주는 용도임

  const res = await axios.get("/products/");
  const products = res.data.results;
  const paths = products.map((product) => ({
    params: { id: String(product.id) },
  }));

  return {
    // return으로 올수있는 값 (https://soojae.tistory.com/65)
    // paths : pre-rendering할 경로를 지정함
    // fallback : getStaticPaths에서 return하지 않은 path는 404 페이지를 return한다.

    paths,
    // paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    // params id로 각 상품의 id를 넣어 줌 - 참고로 params값은 사이트 주소에서 가져오는 값이므로 id 값을 문자열로 작성해야 함
    // ex) 페이지 이름이 pages/posts/[postId]/[commentId]인 경우 params에는 postId와 commentId가 포함되어야 한다.
    fallback: true,
    // 정적 생성한 경로로 들어오지 않았을때 따로 처리해주지 않겠다는 의미임
    // false로 하면 정적생성하지 않는 페이지 경로로 이동하면 404페이x지 나옴
    // true로 하면 getStaticProps함수를 사용해 정적 생성을 하겠다는 거임
    // true로 하면 미처 정적 생성하지 못한 페이지를 그때마다 getStaticProps 함수로 보여줄 수 있는데
    // 일단 데이터 없이 보여줄 로딩 화면을 구현해야 함
  };
  // 이제 빌드를 해보면 1.html, 1.json, 2.html, 2.json이 생성 됨
}

export async function getStaticProps(context) {
  // getStaticProps: 빌드 시 데이터를 fetch하여 static 페이지를 생성
  // console.log(context);
  //   {
  //   params: { id: '숫자' },
  //   locales: undefined,
  //   locale: undefined,
  //   defaultLocale: undefined,
  //   revalidateReason: 'stale'
  //   }
  // 기존의 product와 관련된 모든 코드 가져오고 getStaticProps는 react hook을 사용할 수 없으니까 관련 코드 다 삭제

  const productId = context.params["id"];
  // 한가지 더 작업을 해줘야 함 이렇게만 하고 빌드하면 next.js가 어떤 params가 있는지 전혀 모름
  // 어떤 페이지들을 미리 만들어야 하는지 모름 => getStaticPaths() 함수를 구현하면 됨

  let product;
  try {
    const res = await axios.get(`/products/${productId}`);
    // targetId가 필요한데 이것또한 useRouter를 사용 못하므로 파라미터로 받는 context 객체에서 params 값을 가져옴 (https://soojae.tistory.com/64)
    // getStaticProps함수가 가지고 있는 context object 사용
    product = res.data;
  } catch {
    return {
      // return 값으로 올 수 있는 것
      // revaildate : 정적 페이지를 다시 생성하는 시간을 지정하는 옵션. 해당 시간이 지나면 Nextj.js는 캐시된 페이지를 버리고 새 페이지를 생성함
      // notFound: 페이지에서 404 상태와 404 페이지를 return할 수 있다. true가 404페이지 보여줌
      // redirect: redirect는 클라이언트를 다른 페이지로 redirection한다.
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
  // 내려준 props의 product는 아래 페이지 컴포넌트에서 사용할 거임
}

/** 추가 npm run dev하면 다르게 동작함
 * getStaticProps, getStaticPaths 함수 안에 console.log("@getStaticProps");, console.log("@getStaticPaths");
 * 넣고 npm run dev하고 개발 모드 실행해보면 매번 페이지에 접속할때 마다 함수를 실행함
 * 보통 개발 모드에서는 수정 사항을 그때그때 마다 확인하면서 개발하기 때문임
 * 그런데 실제 웹 사이트 운영 배포에서는 정적 생성을 하면 빌드할 때 딱 한번만 실행되니까 헷갈리지 않도록 주의!!
 */

export default function Product({ product }) {
  // const [product, setProduct] = useState();
  const [sizeReviews, setSizeReviews] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  // async function getProduct(targetId) {
  //   const res = await axios.get(`/products/${targetId}`);
  //   const nextProduct = res.data;
  //   setProduct(nextProduct);
  // }

  async function getSizeReviews(targetId) {
    const res = await axios.get(`/size_reviews/?product_id=${targetId}`);
    const nextSizeReviews = res.data.results ?? [];
    setSizeReviews(nextSizeReviews);
  }

  useEffect(() => {
    if (!id) return;

    // getProduct(id);
    getSizeReviews(id);
  }, [id]);

  // if (!product) return null;

  if (!product)
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );

  return (
    <>
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
    </>
  );
}

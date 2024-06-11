import Head from "next/head";
import axios from "@/lib/axios";
import styles from "@/styles/Search.module.css";
import SearchForm from "@/components/SearchForm";
import ProductList from "@/components/ProductList";

export async function getServerSideProps(context) {
  // Search 페이지를 보면 검색어가 쿼리 스트링으로 되어있어서 이걸 기준으로 검색된 상품 목록을 가져옴
  // 이 페이지를 정적 생성한다면 막히는 부분이 있음 getStaticProps는 useRouter가 아니니까 관련 hook을 사용할 수 없고
  // 어딘가에서 쿼리 스트링 값을 가져 와야 하는데 정적생성은 빌드할 때 미리 만들어 놓는건데 어떤 쿼리가 들어올지 모름
  // 검색어는 사용자가 입력하는 것이기 때문에 웹 브라우저가 접속하는 시점 즉, Next.js 서버로 리퀘스트가
  // 오는 시점에만 알수 있는 값임 => 서버 사이드 렌더링 해야함
  // 서버 사이드 렌더링은 웹 브라우저가 리퀘스트를 보낼때마다 렌더링 해서 보내주는거임

  // 사용방법 똑같음 함수이름을 getServerSideProps로 변경
  // const { q } = router.query;
  // context라는 객체를 파라미터로 받아서 이 객체에 쿼리 값을 쓰면 됨
  // console.log(context); 해보면
  /**
   *  { query: { q: '검색어 값' },
        resolvedUrl: '/search?q=dasf',
        locales: undefined,
        locale: undefined,
        defaultLocale: undefined
      }
   */
  const q = context.query["q"];

  const res = await axios.get(`/products/?q=${q}`);
  const products = res.data.results;

  return {
    props: {
      products,
      q,
    },
  };
}

export default function Search({ products, q }) {
  // const [products, setProducts] = useState([]);

  // const router = useRouter();
  // const { q } = router.query;
  // // 쿼리스트링 값 가져오기

  // async function getProducts(query) {
  //   const res = await axios.get(`/products/?q=${query}`);
  //   const nextProducts = res.data.results;
  //   setProducts(nextProducts);
  // }

  // useEffect(() => {
  //   getProducts(q);
  // }, [q]);

  return (
    <div>
      <Head>
        <title>{q} 검색 결과 - Codeitmall</title>
      </Head>
      <SearchForm initialValue={q} />
      <h2 className={styles.title}>
        <span className={styles.keyword}>{q}</span> 검색 결과
      </h2>
      <ProductList className={styles.productList} products={products} />
      {/* prop으로 styles.productList를 내려보내주는데 ProductList안에 Link컴포넌트안에 styles.product가
        있기 때문에 productList뿐만아니라 product까지 css가 적용이된다! */}
    </div>
  );
}

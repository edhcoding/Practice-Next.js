import Link from "next/link";
import Image from "next/image";
import styles from "./ProductList.module.css";
import StarRating from "./StarRating";

export default function ProductList({ className = "", products }) {
  // prop className으로 styles.products 가져옴

  return (
    <ul className={`${styles.productList} ${className}`}>
      {products?.map((product) => (
        <li key={product.id}>
          <Link className={styles.product} href={`/items/${product.id}`}>
            <div className={styles.image}>
              <Image fill src={product.imgUrl} alt={product.name} />
            </div>
            <div className={styles.content}>
              <div>
                <span className={styles.name}>{product.name}</span>
                <div className={styles.prices}>
                  {/* 세일 가격 */}
                  <span className={styles.originalPrice}>
                    {/* 원래 가격 */}
                    {/* toLocalString()을 사용할 수 있는 객체 Number, Date, Array, Object */}
                    {/* 지정된 숫자, 날자, 배열, 객체의 값을 문자로 리턴 */}
                    {/* 배열은 , 쉼표로 구분해서 리턴, 객체는 안에 어떤값(숫자, 날자, 배열)이 들어있냐에 따라 다르게 나옴 */}
                    {/* 여기서는 숫자 값 이므로 ex) 15000 => 15,000으로 나타냄 */}
                    {product.price.toLocaleString()}원
                  </span>
                  {product.salePrice.toLocaleString()}원
                </div>
              </div>
              <hr className={styles.divider} />
              {/* <hr> 태그는 콘텐츠 내용에서 주제가 바뀔 때 사용할 수 있는 수평 가로선을 정의 */}
              {/* divider는 분할자 라는 뜻 */}
              <div>
                <div className={styles.starRating}>
                  <StarRating value={product.starRating} />
                  {product.starRatingCount.toLocaleString()}
                </div>
                <div className={styles.likeCount}>
                  ♥{product.likeCount.toLocaleString()}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

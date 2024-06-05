import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
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
    // null 병합 연산자 - 앞에 오는 값이 null 또는 undefined이면 뒤에오는 값을, 아니면 null 또는 undefined을 반환
    // + 옵셔널 체이닝(.?) - 객체의 속성이 없는 경우, typeError가 발생하지 않고 undefined가 반환됨
    setSizeReviews(nextSizeReviews);
  }

  useEffect(() => {
    if (!id) return;
    getProduct(id);
    getSizeReviews(id);
  }, [id]);

  if (!product) return null;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imgUrl} alt={product.name} />
      <SizeReviewList sizeReviews={sizeReviews} />
    </div>
  );
}

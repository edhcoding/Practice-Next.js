import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./SearchForm.module.css";

export default function SearchForm({ initialValue = "" }) {
  const router = useRouter();

  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
    // 검색어값 가져오기
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 기본 새로고침 기능 멈추기
    if (!value) {
      // 검색어 값이 없다면
      router.push("/");
      // 다시 홈 페이지로 이동
      return;
    }
    router.push(`/search?q=${value}`);
    // value 값이 있다면 .push 메서드에 있는 쿼리스트링 값으로 이동하기
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        name="q"
        // 내 생각에는 쿼리스트링 /search?q= 이 부분을 인풋으로 했다고 보여주기 위해 맞춘것 같다
        value={value}
        placeholder="찾고 싶은 옷을 검색해보세요."
        onChange={handleChange}
      />
      <button className={styles.searchButton}>검색</button>
    </form>
  );
}

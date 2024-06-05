import { useRouter } from "next/router";
import SearchForm from "@/components/SearchForm";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;

  return (
    <div>
      <h1>Search Page</h1>
      <SearchForm initialValue={q} />
      <h2>{q} 검색 결과</h2>
    </div>
  );
}

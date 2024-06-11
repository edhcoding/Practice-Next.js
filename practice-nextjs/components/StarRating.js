const RATINGS = [1, 2, 3, 4, 5];

export default function StarRating({ value = 1 }) {
  // value는 starRating임 기본값은 별1개

  return <span>{RATINGS.map((rating) => (value >= rating ? "★" : "✩"))}</span>;
}
6;

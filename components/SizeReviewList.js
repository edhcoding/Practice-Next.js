function formatDate(date) {
  const MM = String(date.getUTCMonth() + 1).padStart(2, "0");
  // pad는 좌우에 특정 문자열을 채우는 기능을 함
  // 첫번째 인수로는 목표로 하는 문자열의 길이를, 두번째 인수로는 필요한 경우 채우기에 해당하는 값으로 기본값은 공백 문자열임("")
  // padStart 함수는 문자열의 앞부분을 특정 길이로 채우는 역할을 함
  // padEnd 함수는 문자열의 끝에 특정 문자나 문자열을 채워서 지정된 길이로 만드는 내장 함수임
  // 예시
  // const str = "123";
  // const paddedStr1 = str.padStart(7, "0"); console.log(paddedStr1); // 출력 : "0000123"
  // const paddedStr2 = str.padStart(10); console.log(paddedStr2); // 출력 : "      123"
  // const paddedStr3 = str.padStart(4, "789"); console.log(paddedStr3); // 출력 : "7123"
  // const paddedStr4 = str.padStart(10, "789"); console.log(paddedStr4); // 출력 : "7897897123"
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const YYYY = String(date.getUTCFullYear());

  return `${YYYY}. ${MM}. ${dd}.`;
}

const labels = {
  sex: {
    male: "남자",
    female: "여자",
  },
  fit: {
    small: "작음",
    good: "적당함",
    big: "큼",
  },
};

export default function SizeReviewList({ sizeReviews }) {
  return (
    <ul>
      {sizeReviews.map((sizeReview) => (
        <li key={sizeReview.id}>
          <div>
            <div>{formatDate(new Date(sizeReview.createdAt))}</div>
            <div>
              ({labels.sex[sizeReview.sex]} {sizeReview.height}cm 기준){" "}
              {sizeReview.size}
            </div>
          </div>
          <div>{labels.fit[sizeReview.fit]}</div>
        </li>
      ))}
    </ul>
  );
}

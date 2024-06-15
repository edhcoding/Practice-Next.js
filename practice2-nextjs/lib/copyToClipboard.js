// 문자열을 클립보드로 복사해주는 함수
// Clipboard API를 사용함
export default async function copyToClipboard(text) {
  const type = 'text/plain';
  // 클립보드에 복사할 텍스트의 MIME 타입을 지정함 텍스트 파일의 기본타입임 text/plain
  const blob = new Blob([text], { type });
  // Blob객체는 웹에서 사용되는 데이터 형식으로, 이진 데이터를 나타내며, 텍스트, 이미지, 오디오, 비디오 등 다양한 형식을 지원함
  // let helloWorldBlob = new Blob(["Hello, World!"], {type : "text/plain"}); 이런식으로 작성
  const data = [new ClipboardItem({ [type]: blob })];
  // ClipboardItem은 클립보드에 저장할 데이터를 나타냄
  // ClipboardItem 객체를 생성하여 Blob 객체를 클립보드 항목으로 래핑함
  // [type]: blob는 ES6의 계산된 속성명 문법을 사용하여 객체를 정의함
  await navigator.clipboard.write(data);
  // Clipboard API의 write 메서드를 사용하여 클립보드에 데이터를 씁니다.
}
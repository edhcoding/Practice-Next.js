// 문자열을 클립보드로 복사해주는 함수
export default async function copyToClipboard(text) {
  const type = 'text/plain';
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  await navigator.clipboard.write(data);
}

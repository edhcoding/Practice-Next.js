import { useRef } from 'react';
import BaseQRCode from 'react-qr-code';

// QR코드를 보여주는 컴포넌트
// react-qr-code 라이브러리 사용함
// 클릭하면 다운로드 할수있게 downloadSVG 함수 구현
function downloadSVG(name, svg) {
  const base64doc = window.btoa(svg.outerHTML);
  const width = parseInt(svg.getAttribute('width'));
  const height = parseInt(svg.getAttribute('height'));

  const image = document.createElement('img');
  image.src = 'data:image/svg+xml;base64,' + base64doc;
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);

    const dataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.download = `${name}.png`;
    a.href = dataURL;
    a.click();
  };
}

// 파일 제목 title, 사이트 주소 value 라는 prop으로 내려주면 반환값으로 QR코드를 보여줄 수 있음
export default function QRCode({ className, title, value }) {
  const svgRef = useRef();

  function handleQRClick() {
    downloadSVG(title, svgRef.current);
  }

  return <BaseQRCode className={className} value={value} onClick={handleQRClick} ref={svgRef} />;
}

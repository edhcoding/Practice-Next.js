import { useEffect, useState, useRef } from "react";
import styles from "./Dropdown.module.css";

// Dropdown 컴포넌트는 select태그랑 비슷함
export default function Dropdown({
  className, //styles.input
  name, // = "theme"
  value, // = {theme}
  options,
  /**
   * {[
        { label: "라이트", value: "light" },
        { label: "다크", value: "dark" },
      ]}
   */
  onChange, // {(name, value) => setTheme(value)}
}) {
  const [isOpen, setIsOpen] = useState(false);
  // isOpen state는 theme을 선택할 수 있는 선택창이 열리면 true 기본값으로 닫혀있으면 false

  const inputRef = useRef(null);
  // Dom 노드 요소에 접근하기 위해서 useRef 사용, 렌더링이 일어나도 값이 변하지 않고 유지

  function handleInputClick() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    // 현재상태의 반대 값을 반환함
    // setIsOpen((prevIsOpen) => !prevIsOpen); 여기서 not 연산자를 없애면 선택창이 아래로 안내려 감
  }

  // handleBlur 함수의 이벤트 핸들러인 onBlur는 focus의 반대의미로 포커스를 잃었을때 발생함
  // 해당 요소의 밖을 클릭했을 때 발생시킬거임
  function handleBlur() {
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      // 요소 안에 누르면 true 밖에 누르면 false 잘 클릭했는지 보여줌
      // inputRef.current?.contains(e.target); => 현재 이벤트가 실행한 타겟이 inpuRef.current안에 포함되어있는지 물어보는 거임
      const isInside = inputRef.current?.contains(e.target);
      if (!isInside) {
        setIsOpen(false);
      }
    }

    // handleClickOutside 함수를 이용해 만약에 밖에(false)를 클릭하면 setIsOpen을 false로 닫아준다
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const classNames = `${styles.input} ${
    isOpen ? styles.opened : ""
  } ${className}`;
  // 여기서 className은 setting.js에서의 styles.input 스타일을 말하므로 다른 styles.input임
  
  const selectedOption = options.find((option) => option.value === value);
  // find() 함수는 배열에서 특정 조건을 만족하는 요소를 찾아 첫 번째 요소를 반환하는 함수
  // 조건을 만족하는 값이 없으면 undefined를 반환함
  // 선택한 옵션의 값과 value가 일치하는 값을 찾음

  return (
    <div
      className={classNames}
      onClick={handleInputClick}
      onBlur={handleBlur}
      tabIndex="0"
      // div에 onBlur 이벤트를 발생시키기 위해서는 tab-index와 함께 쓰여야한다는 사실!!!! 중요
      // <button>, <input>, <select>, <a>태그같이 상호작용 할 수 있게 도와주는 요소는 focus, blur를 지원
      // <div>, <span>, <table>같이 무언가를 표시하는 용도로 사용하는 요소들은 포커싱을 지원하지 않기 때문에
      // tabIndex랑 같이 사용해야함
      ref={inputRef}
      // 해당 div의 이벤트 값을 참조?
    >
      {selectedOption.label}
      {/* 점 표기법으로 객체의 값을 하나씩 가져올 수 있음 selectedOption이 { label: "라이트", value: "light" }일 때
      selectedOption.label은 "라이트", selectedOption.value는 "light"를 가리킴 */}
      <span className={styles.arrow}>▴</span>
      <div className={styles.options}>
        {options.map((option) => {
          const selected = value === option.value;
          const className = `${styles.option} ${
            selected ? styles.selected : ""
          }`;
          return (
            <div
              className={className}
              key={option.value}
              onClick={() => onChange(name, option.value)}
              // setting.js 에서의 onChange={(name, value) => setTheme(value)} 이므로 고른 값을 이용해 theme state 변경

              // onChange 메뉴에서 항목을 선택하거나 텍스트 입력란에 입력할 때 호출됨
              // 간략설명: 첫번째 요소는 내가 어떤걸 변경했는지 식별용도, 두번째 요소는 선택 요소의 값을 반환

              // name= "theme" name 인수는 일반적으로 변경된 요소의 이름을 나타냅니다.
              // 폼이나 여러 입력 요소가 있는 경우, 어떤 요소가 변경되었는지 식별하는 데 사용됩니다.
              // 예를 들어, 폼의 여러 필드 중 특정 필드의 값을 업데이트할 때 유용합니다.

              // option.value 인수는 선택된 옵션의 값을 나타냅니다.
              // 드롭다운 메뉴나 라디오 버튼 그룹과 같은 선택 요소에서 선택된 항목의 실제 값을 전달합니다.
              // 예를 들어, 드롭다운 메뉴에서 "라이트"를 선택하면 option.value는 "light"가 됩니다.
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

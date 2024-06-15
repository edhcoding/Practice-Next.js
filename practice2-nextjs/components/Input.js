import { forwardRef } from "react";
import styles from "./Input.module.css";

// React 컴포넌트에서 ref prop을 사용하려면 React에서 제공하는 forwardRef()라는 함수를 사용해야 함
// React 컴포넌트를 forwardRef()라는 함수로 감싸주면, 해당 컴포넌트는 함수는 두 번째 매개 변수를 갖게 되는데,
// 이를 통해 외부에서 ref prop을 넘길 수 있습니다.
// rest에는 onChange, value 들어있음
export default forwardRef(function Input(
  { className = "", variant, ...rest },
  ref
) {
  const classNames = `${styles.input} ${className}`;
  return <input className={classNames} {...rest} ref={ref} />;
});

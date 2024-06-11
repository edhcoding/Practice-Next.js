import styles from "./Container.module.css";

export default function Container({ className = "", page = false, children }) {
  const classNames = `${styles.container} ${
    page ? styles.page : ""
  } ${className}`;
  // Container.module.css의 .container가 적용되고 있고
  // page가 true이면 styles.page가 적용되는거고 false이면 공백 문자열이 적용됨
  // className prop으로 style.continer가 들어옴 하지만 앞에있는 page가 true 여야지만
  // Container.module.css의 .page.container가 적용되지 아니면 중복되는 styles.container는 하나로 인식

  return <div className={classNames}>{children}</div>;
}

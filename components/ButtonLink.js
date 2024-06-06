import Link from "next/link";
import styles from "./ButtonLink.module.css";

export default function ButtonLink({ className = "", ...props }) {
  return <Link className={`${styles.buttonLink} ${className}`} {...props} />;
}

import styles from './Button.module.css';

const VARIANTS = {
  primary: styles.primary,
  secondary: styles.secondary,
  minimal: styles.minimal,
  outline: styles.outline,
};

export default function Button({
  className = '',
  variant,
  as: AsComponent,
  ...rest
}) {
  const classNames = `${styles.button} ${
    VARIANTS[variant] ?? styles.primary
  } ${className}`;
  // ??연산자는 앞에 값이 null, undefind 면 뒤에 값 적용

  if (AsComponent) {
    return <AsComponent className={classNames} {...rest} />;
  }

  return <button className={classNames} {...rest} />;
}
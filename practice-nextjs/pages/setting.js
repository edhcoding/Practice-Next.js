import styles from "@/styles/Setting.module.css";
import Dropdown from "@/components/Dropdown";
import { useTheme } from "@/lib/ThemeContext";

export default function Setting() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div>
        <h1 className={styles.title}>설정</h1>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>테마 설정</h2>
          <Dropdown
            // Dropdown 컴포넌트는 select 태그랑 비슷하게 여러 옵션을 prop으로 내려주고 선택할 수 있게해줌
            className={styles.input}
            name="theme"
            value={theme}
            onChange={(name, value) => setTheme(value)}
            // options 값을 선택하면 onChange 핸들러를 실행시킴
            options={[
              { label: "라이트", value: "light" },
              { label: "다크", value: "dark" },
            ]}
          />
        </section>
      </div>
    </>
  );
}

// import Dropdown from '@/components/Dropdown';
// import { useTheme } from '@/lib/ThemeContext';
// import styles from '@/styles/Setting.module.css';

//   return (
//     <div>
//       <h1 className={styles.title}>설정</h1>
//       <section className={styles.section}>
//         <h2 className={styles.sectionTitle}>테마 설정</h2>
//         <Dropdown
//           className={styles.input}
//           name="theme"
//           value={theme}
//           onChange={(name, value) => setTheme(value)}
//           options={[
//             { label: '라이트', value: 'light' },
//             { label: '다크', value: 'dark' },
//           ]}
//         />
//       </section>
//     </div>
//   );
// }

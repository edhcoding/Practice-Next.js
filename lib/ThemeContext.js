import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // 이 context는 light, dark라는 문자열을 값으로 갖는 ThemeContext임
  const [theme, setTheme] = useState("dark");
  // theme값이 바뀔때마다 body태그의 클래스를 바꿔서 배경색을 바꿔 볼 거임

  useEffect(() => {
    // body 태그를 바꾸려면 _document.js에 가서 써야할 것 같은데 Document 컴포넌트에서는 hook을 사용못함
    // 따라서 JS 코드를 사용해서 body 태그를 바꿔 볼 거임
    document.body.classList.add(theme);
    // body태그에 해당 light or dark theme이라는 클래스를 추가하는거임
    // global.css에서 body.light or body.dark로 클래스 지정 할 수 있게 해 줌

    return () => {
      // 그리고 theme값이 다시 바뀔때는 추가했던 theme을 제거해줄 거임
      document.body.classList.remove(theme);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext 안에서 써야 합니다");
  }

  return themeContext;
}

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";

type THEME = "LIGHT" | "DARK";

interface IThemeContext {
  theme: THEME;
  toggleThem: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<THEME>("LIGHT");

  const toggleThem = (): void => {
    setTheme((prevTheme): THEME => (prevTheme === "LIGHT" ? "DARK" : "LIGHT"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleThem }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThem은 반드시 ThemeProvider 안에서 사용되어야 합니다.");
  }

  return context;
};

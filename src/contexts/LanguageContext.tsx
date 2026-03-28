import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Language = "it" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "it";
    }

    const storedLanguage = window.localStorage.getItem("site-language");
    return storedLanguage === "en" ? "en" : "it";
  });

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "it" ? "en" : "it"));
  };

  useEffect(() => {
    window.localStorage.setItem("site-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
};

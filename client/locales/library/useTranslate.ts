import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "src/locales/library/Provider";

const language: { [key: string]: string } = {
  "ru-RU": "ru",
  "en-US": "en",
  "en-GB": "en"
};

export const useTranslate = (level: string) => {
  const locales: { [key: string]: any } = useContext(Context);
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      const detect: string =
        // @ts-ignore
        window.navigator.userLanguage || window.navigator.language;
      setLang(language[detect]);
    }
  }, []);

  const t = useCallback(
    (field: string) => {
      return lang ? locales[level]?.[field]?.en || "invalid" : "";
    },
    [lang, level, locales]
  );

  return { t };
};

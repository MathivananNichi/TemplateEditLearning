import i18n from "./i18n";

export const localization = new Proxy(
  {},
  {
    get: (_, key: string) => i18n.t(key),
  },
) as {
  [K in keyof typeof import("./lang-json/en.json")]: string;
};

export const changeLanguage = (language: "en" | "ta" | "hi") => {
  i18n.changeLanguage(language);
};

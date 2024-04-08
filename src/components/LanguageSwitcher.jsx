import * as React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", lang: "English" },
    { code: "hi", lang: "Hindi" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      {languages.map((lng) => (
        <Button
          className="hidden md:block"
          key={lng.code} // Add a unique key for each element in the array
          variant={lng.code === i18n.language ? "" : "outline"}
          onClick={() => changeLanguage(lng.code)}
        >
          {lng.lang}
        </Button>
      ))}
    </>
  );
}

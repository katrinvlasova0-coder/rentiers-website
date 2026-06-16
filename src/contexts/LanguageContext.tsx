'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Lang, Translations } from '@/i18n';
import { pageContent, PageContent } from '@/i18n/pages';

interface LangCtx {
  lang: Lang;
  t: Translations;
  p: PageContent;
  toggle: () => void;
}

const LanguageContext = createContext<LangCtx>({
  lang: 'de',
  t: translations.de,
  p: pageContent.de,
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('de');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rentiers-lang') as Lang;
      if (saved === 'en' || saved === 'de') setLang(saved);
    } catch {}
  }, []);

  const toggle = () => {
    const next: Lang = lang === 'de' ? 'en' : 'de';
    setLang(next);
    try { localStorage.setItem('rentiers-lang', next); } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], p: pageContent[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

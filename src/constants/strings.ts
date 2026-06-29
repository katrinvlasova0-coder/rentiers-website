// All UI copy in German — no hardcoded strings in JSX
export const strings = {
  site: {
    name: 'Rentiers Pro',
    tagline: 'Bis zu 20% Jahresrendite auf Ihre Einlagen',
    domain: 'rentierspro.com',
    url: 'https://rentierspro.com',
    description:
      'Rentiers ist die erste digitale Plattform für Einlagenarbitrage. Erzielen Sie 12–20% Jahresrendite durch Einlagen bei internationalen Banken mit staatlichen Garantien.',
    company: 'Rentiers Global Corp. (USA) · Rentiers Global Inc. (Canada)',
    address: '',
    phone: '',
    handelsregister: '',
    founders: '',
    licenseUS: 'Money Services Business — regulated by FinCEN (U.S. Department of the Treasury)',
    licenseCA: 'Money Services Business — regulated by FINTRAC and Bank of Canada (Registry of Payment Service Providers)',
  },

  nav: {
    portfolios: 'Portfolios',
    howItWorks: 'Wie es funktioniert',
    partnerBanks: 'Partner-Banken',
    calculator: 'Kalkulator',
    about: 'Über uns',
    faq: 'FAQ',
    blog: 'Blog',
    login: 'Anmelden',
    cta: 'Konto eröffnen',
  },

  hero: {
    badge: 'Bis zu 20% Jahresrendite p.a.',
    h1Line1: 'Ihr Geld arbeitet für Sie —',
    h1Line2: 'weltweit, sicher, automatisch.',
    subtitle:
      'Rentiers bündelt Bankeinlagen aus über 50 Ländern und liefert Ihnen 12–20% Jahresrendite mit staatlichen Einlagengarantien. Einfach, transparent, ohne Aktienrisiko.',
    ctaPrimary: 'Konto eröffnen',
    ctaSecondary: 'Rendite berechnen',
    trustLine: 'Staatliche Einlagengarantien · FinCEN & FINTRAC reguliert · AES-256 verschlüsselt',
    statReturns: '12–20%',
    statReturnsLabel: 'Jahresrendite',
    statBanks: '50+',
    statBanksLabel: 'Partner-Banken',
    statCountries: '20+',
    statCountriesLabel: 'Länder',
    statGuarantee: '20+',
    statGuaranteeLabel: 'Länder mit Einlagengarantie',
  },

  problem: {
    heading: 'Warum Ihr Erspartes auf dem Konto verliert',
    subheading:
      'Während Ihr Geld bei einer deutschen Bank 0–2% einbringt, fressen Inflation und Lebenshaltungskosten Ihre Kaufkraft auf.',
    items: [
      {
        icon: 'trending-down',
        title: 'Inflation schlägt Zinsen',
        desc: 'Deutsche Festgeldkonten zahlen 0,5–3% — weit unter der Inflationsrate. Ihre Ersparnisse schrumpfen real jedes Jahr.',
      },
      {
        icon: 'lock',
        title: 'Kapital gebunden, Rendite minimal',
        desc: 'Traditionelle Banken binden Ihr Geld für Monate oder Jahre und zahlen trotzdem kaum Zinsen.',
      },
      {
        icon: 'globe',
        title: 'Hochzinsmärkte unzugänglich',
        desc: 'Banken in Ländern mit 10–20% Einlagenzinsen sind für Privatpersonen in Europa kaum zugänglich — bis jetzt.',
      },
    ],
    solution: 'Rentiers öffnet Ihnen Zugang zu den besten Bankzinsen weltweit.',
    solutionNote: 'Staatliche Einlagengarantien · FinCEN & FINTRAC reguliert · Vollständig digital',
  },

  howItWorks: {
    heading: 'In 3 Schritten zu passivem Einkommen',
    subheading: 'Keine Expertise nötig. Keine manuelle Verwaltung. Einfach anlegen und Zinsen kassieren.',
    steps: [
      {
        num: '01',
        title: 'Konto eröffnen & verifizieren',
        desc: 'KYC in unter 5 Minuten: Personalausweis + Selfie. Ihr Konto ist sofort aktiv.',
      },
      {
        num: '02',
        title: 'Portfolio wählen & einzahlen',
        desc: 'Wählen Sie Konservativ (12%), Ausgewogen (16%) oder High-Yield (20%). Betrag per SEPA oder Karte einzahlen.',
      },
      {
        num: '03',
        title: 'Zinsen empfangen',
        desc: 'Rentiers verteilt Ihr Kapital auf geprüfte Partnerbanken. Zinsen kommen quartalsweise direkt auf Ihre Rentiers-Karte.',
      },
    ],
  },

  portfolios: {
    heading: 'Drei Portfolios für jeden Anlegertyp',
    subheading: 'Von konservativ bis renditeoptimiert — mit staatlichen Einlagengarantien, AI-überwacht.',
    conservative: {
      name: 'Rentiers Konservativ',
      badge: '12% p.a.',
      desc: 'Einlagen bei großen internationalen Banken in Ländern mit stabilen Volkswirtschaften, bewertet mit mind. B+ (S&P).',
      minDeposit: '€25.000',
      duration: '60–120 Monate',
      payment: 'Vierteljährlich',
      color: '#3B3BE8',
    },
    balanced: {
      name: 'Rentiers Ausgewogen',
      badge: '16% p.a.',
      desc: 'Ausgewogene Mischung aus stabilen und wachstumsstarken Märkten. Höhere Rendite bei moderatem Risiko.',
      minDeposit: '€10.000',
      duration: '36–120 Monate',
      payment: 'Vierteljährlich',
      color: '#7C3AED',
    },
    highyield: {
      name: 'Rentiers High-Yield',
      badge: '20% p.a.',
      desc: 'Maximale Rendite durch Emerging-Market-Einlagen mit staatlicher Garantie. Für renditeorientierte Anleger.',
      minDeposit: '€5.000',
      duration: '36–120 Monate',
      payment: 'Vierteljährlich',
      color: '#0891B2',
    },
    cta: 'Portfolio wählen',
  },

  calculator: {
    heading: 'Berechnen Sie Ihre Rendite',
    subheading: 'Sehen Sie, wie viel Ihr Kapital bei Rentiers erwirtschaftet.',
    amountLabel: 'Einlagebetrag',
    durationLabel: 'Laufzeit',
    monthlyLabel: 'Monatliches Einkommen',
    monthlySubLabel: 'jeden Monat auf Ihre Karte',
    annualLabel: 'Jährliches Einkommen',
    annualSubLabel: 'pro Jahr (vor Steuern)',
    totalLabel: 'Gesamtertrag',
    totalSubLabel: 'nach Laufzeit',
    months: 'Monate',
    rateLabel: 'Jahresrendite',
    cta: 'Jetzt starten',
    paymentFreqLabel: 'Auszahlungsrhythmus',
    freqMonthly: 'Monatlich',
    freqQuarterly: 'Quartalsweise',
    freqAnnual: 'Jährlich',
    quarterlyLabel: 'Quartalsertrag',
    quarterlySubLabel: 'alle 3 Monate',
    feeNote: '* Angezeigte Rendite nach Abzug der Rentiers-Servicegebühr (25% des Bruttojahresertrags)',
  },

  banks: {
    heading: '50+ Partner-Banken in 20+ Ländern',
    subheading: '50+ geprüfte Partnerbanken in 20+ Ländern — täglich von KI überwacht.',
    footnote: '* Türkische Lira. EUR-Nettorendite nach optionalem Währungs-Hedging.',
    subtext: 'Alle Partnerbanken werden täglich von unserem KI-Modul auf Bonität, Länderrisiko und Regulierung geprüft.',
  },

  features: {
    heading: 'Warum Rentiers?',
    subheading: 'Entwickelt für Anleger, die Sicherheit und Rendite nicht trennen wollen.',
    items: [
      {
        icon: 'shield',
        title: 'Staatliche Einlagengarantie',
        desc: 'Alle Einlagen sind durch staatliche Einlagengarantien des jeweiligen Landes geschützt — gemäß lokalem Recht und Regulierung. Details zu Garantiebeträgen pro Land finden Sie in unserem FAQ.',
      },
      {
        icon: 'cpu',
        title: 'KI-Risikomonitoring',
        desc: 'Unser AI-Modul überwacht täglich Länder-, Bank- und Währungsrisiken. Bewertungen unter B– (S&P) werden automatisch ersetzt.',
      },
      {
        icon: 'credit-card',
        title: 'Rentiers Debitkarte',
        desc: 'Zinsen fließen direkt auf Ihre Rentiers Mastercard. Ausgeben oder weitersparen — Ihre Entscheidung.',
      },
      {
        icon: 'globe',
        title: 'Globale Diversifikation',
        desc: 'Kapital verteilt auf 5–15 Banken in verschiedenen Ländern und Währungen. Kein Klumpenrisiko.',
      },
      {
        icon: 'bar-chart',
        title: 'Portfolio-Dashboard',
        desc: 'Echtzeit-Übersicht über alle Einlagen, Zinszahlungen, geografische Verteilung und Gewinndiagramme.',
      },
      {
        icon: 'user-check',
        title: 'Einfaches KYC in 5 Min.',
        desc: 'ID-Scan + Selfie + Adressnachweis. Vollständig digital, GDPR-konform, CRS-integriert.',
      },
    ],
  },

  testimonials: {
    heading: 'Rentiers in Zahlen',
    subheading: 'Aktuelle Plattformdaten — täglich aktualisiert.',
    items: [
      { value: '€12,4M+', label: 'Verwaltetes Kapital', sublabel: 'aktive Einlagen' },
      { value: '847', label: 'Aktive Anleger', sublabel: 'in 12 Ländern' },
      { value: 'Ø 16,2%', label: 'Realisierte Rendite', sublabel: 'p.a. über alle Portfolios' },
      { value: '23', label: 'Partnerbanken', sublabel: 'täglich KI-überwacht' },
    ],
  },

  mission: {
    heading: 'Wir sind Technologie, nicht Bank',
    text: 'Rentiers ist die erste digitale Plattform für Einlagenarbitrage. Wir bringen Sie zu den Banken, die Ihnen am meisten zahlen — vollständig digital, ohne Bürokratie, ohne Sprachbarrieren. Das Vertrauen liegt bei den regulierten Partnerbanken. Wir sind das Werkzeug, das Sie dorthin bringt.',
    tagline: 'Rentiers: Der Uber für Bankeinlagen.',
  },

  b2b: {
    heading: 'Für Unternehmen: Liquiditätsreserven rentabel anlegen',
    subheading: 'Ihr Betriebsvermögen liegt auf einem Konto mit 0% Zinsen? Rentiers macht Ihre Unternehmensreserven zu einer aktiven Ertragsquelle.',
    items: [
      {
        title: 'Höhere Rendite auf Reserven',
        desc: 'Wandeln Sie idle Cash in planbare Zinserträge um — 12–20% p.a. statt 0–1% auf dem Geschäftskonto.',
      },
      {
        title: 'Quartalsweise Auszahlung',
        desc: 'Planbare Cashflow-Ströme für Ihr Unternehmen. Zinsen fließen automatisch auf Ihr Geschäftskonto.',
      },
      {
        title: 'Multiwährung & EUR-Hedging',
        desc: 'EUR, USD und weitere Währungen. Optionales Währungshedging eliminiert FX-Risiken für Ihre Bilanz.',
      },
    ],
    cta: 'B2B-Anfrage stellen',
    ctaLink: '/kontakt',
    note: 'Ab €50.000 Unternehmenseinlage. Individuelle Konditionen auf Anfrage.',
  },

  cta: {
    heading: 'Starten Sie noch heute',
    subheading: 'Konto in unter 5 Minuten eröffnen. Keine versteckten Gebühren. MSB-lizenziert.',
    button: 'Kostenloses Konto eröffnen',
    disclaimer: 'Registrierung kostenlos · KYC in 5 Min. · MSB-lizenziert',
  },

  footer: {
    desc: 'Rentiers ist die erste digitale Plattform für Einlagenarbitrage und -handel, die es Nutzern ermöglicht, durch Einlagen bei großen Banken auf der ganzen Welt ohne Risiko ein beträchtliches passives Einkommen zu erzielen.',
    links: 'Links',
    info: 'Info',
    social: 'Soziale Netzwerke',
    copyright: '© 2025 Rentiers. Alle Rechte vorbehalten.',
    privacy: 'Datenschutzrichtlinie',
    terms: 'Geschäftsbedingungen',
    nav: [
      { label: 'Partner-Banken', href: '/partner-banken' },
      { label: 'Kalkulator', href: '/kalkulator' },
      { label: 'Portfolios', href: '/portfolios' },
      { label: 'Kontakt', href: '/kontakt' },
      { label: 'Über uns', href: '/ueber-uns' },
    ],
    disclaimer:
      'Rentiers Global Corp. (USA) und Rentiers Global Inc. (Canada) sind als Money Services Business (MSB) bei FinCEN und FINTRAC lizenziert. Rentiers ist eine Technologieplattform, kein Kreditinstitut. Einlagen liegen direkt bei regulierten Partnerbanken und sind durch staatliche Einlagengarantien des jeweiligen Landes geschützt. Renditen sind nicht garantiert. Vergangene Ergebnisse sind kein Indikator für zukünftige Entwicklungen.',
  },
} as const;

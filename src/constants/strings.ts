// All UI copy in German — no hardcoded strings in JSX
export const strings = {
  site: {
    name: 'Rentiers Pro',
    tagline: 'Bis zu 20% Jahresrendite auf Ihre Einlagen',
    domain: 'rentierspro.com',
    url: 'https://rentierspro.com',
    description:
      'Rentiers ist die erste digitale Plattform für Einlagenarbitrage. Erzielen Sie 12–20% Jahresrendite durch Einlagen bei internationalen Banken mit staatlichen Garantien.',
    company: 'Rentiers SA',
    address: '1368 Ville Haute Luxembourg, Luxemburg',
    phone: '+49 (0) 69 1234 5678',
    handelsregister: 'LU 127-18093451',
    founders: 'Max Müller, Pierre Dijon',
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
    badge: 'Bis zu 20% Jahresrendite garantiert',
    h1Line1: 'Ihr Geld arbeitet für Sie —',
    h1Line2: 'weltweit, sicher, automatisch.',
    subtitle:
      'Rentiers bündelt Bankeinlagen aus über 50 Ländern und liefert Ihnen 12–20% Jahresrendite mit staatlichen Einlagengarantien. Einfach, transparent, ohne Aktienrisiko.',
    ctaPrimary: 'Rendite berechnen',
    ctaSecondary: 'So funktioniert es',
    trustLine: 'Staatliche Einlagengarantien · Keine Mindestlaufzeit-Strafe · MSB-lizenziert',
    statReturns: '12–20%',
    statReturnsLabel: 'Jahresrendite',
    statBanks: '50+',
    statBanksLabel: 'Partner-Banken',
    statCountries: '20+',
    statCountriesLabel: 'Länder',
    statGuarantee: '100%',
    statGuaranteeLabel: 'Staatl. garantiert',
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
    subheading: 'Von konservativ bis renditeoptimiert — staatlich garantiert, AI-überwacht.',
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
    annualSubLabel: 'pro Jahr garantiert',
    totalLabel: 'Gesamtertrag',
    totalSubLabel: 'nach Laufzeit',
    months: 'Monate',
    rateLabel: 'Jahresrendite',
    cta: 'Jetzt starten',
  },

  banks: {
    heading: 'Unsere Partner-Banken',
    subheading: 'Ihr Kapital liegt bei geprüften Großbanken mit staatlichen Einlagengarantien.',
  },

  features: {
    heading: 'Warum Rentiers?',
    subheading: 'Entwickelt für Anleger, die Sicherheit und Rendite nicht trennen wollen.',
    items: [
      {
        icon: 'shield',
        title: 'Staatliche Einlagengarantie',
        desc: 'Alle Einlagen sind durch staatliche Garantieprogramme abgesichert — ähnlich dem deutschen EDIS, aber in über 50 Ländern.',
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
    heading: 'Was unsere Kunden sagen',
    items: [
      {
        name: 'Thomas B.',
        role: 'Unternehmer, München',
        text: 'Mein Betriebsvermögen lag jahrelang auf einem Konto mit 0,1% Zinsen. Jetzt generiert es 16% p.a. — ohne dass ich etwas tun muss.',
        rating: 5,
      },
      {
        name: 'Ingrid M.',
        role: 'Rentnerin, Wien',
        text: 'Endlich wieder von Zinsen leben wie früher. 12% p.a. auf mein Erspartes — vierteljährliche Auszahlung direkt auf die Karte.',
        rating: 5,
      },
      {
        name: 'Karim A.',
        role: 'Freiberufler, Zürich',
        text: 'Nach Crypto-Verlusten wollte ich etwas Stabiles. Rentiers gibt mir 16% Rendite mit staatlicher Garantie. Das ist der Sweet Spot.',
        rating: 5,
      },
    ],
  },

  cta: {
    heading: 'Starten Sie noch heute',
    subheading: 'Konto in unter 5 Minuten eröffnen. Keine Mindestlaufzeit-Strafe. Jederzeit kündbar.',
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
      'Rentiers SA ist als Money Services Business (MSB) in Kanada und den USA lizenziert. Investitionen sind mit Risiken verbunden. Vergangene Renditen sind keine Garantie für zukünftige Ergebnisse. Einlagen können staatlichen Garantieprogrammen der jeweiligen Länder unterliegen.',
  },
} as const;

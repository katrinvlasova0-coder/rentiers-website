export type FallbackCategory = 'Finanzbildung' | 'Sicherheit' | 'B2B';

export interface SafeTemplate {
  id: string;
  category: FallbackCategory;
  cluster: string;
  keywordDe: string;
  keywordEn: string;
  titleDe: string;
  titleEn: string;
  descriptionDe: string;
  descriptionEn: string;
  unsplashQuery: string;
  headingsDe: [string, string, string, string, string, string];
  headingsEn: [string, string, string, string, string, string];
  factsDe: string[];
  factsEn: string[];
  listDe: string[];
  listEn: string[];
  tableHeadersDe: [string, string, string];
  tableHeadersEn: [string, string, string];
  tableRows: Array<[string, string, string]>;
  faqDe: Array<{ question: string; answer: string }>;
  faqEn: Array<{ question: string; answer: string }>;
}

export const SAFE_TEMPLATES: SafeTemplate[] = [
  {
    id: 'einlagensicherung-eu',
    category: 'Sicherheit',
    cluster: 'Sicherheit',
    keywordDe: 'Einlagensicherung EU',
    keywordEn: 'EU deposit insurance',
    titleDe: 'Einlagensicherung EU: Regeln, Limits und Quellen 2026',
    titleEn: 'EU deposit insurance: rules, limits and sources 2026',
    descriptionDe:
      'Einlagensicherung EU im Überblick: 100.000-Euro-Limit, nationale Systeme, EDIS-Debatte und Prüffragen für Leser. Bildungsartikel ohne Renditeversprechen.',
    descriptionEn:
      'EU deposit insurance explained: the 100,000-euro limit, national schemes, the EDIS debate and practical checks. Educational briefing without yield claims.',
    unsplashQuery: 'european bank regulation documents',
    headingsDe: [
      'Was Einlagensicherung EU rechtlich abdeckt',
      'Nationale Systeme und das 100.000-Euro-Limit',
      'Fünf Prüfpunkte vor einer Auslandsanlage',
      'Vergleich: Sicherungslogik in ausgewählten Systemen',
      'Häufige Missverständnisse zur Einlagensicherung EU',
      'Quellen, Aufsicht und weiterführende Einordnung',
    ],
    headingsEn: [
      'What EU deposit insurance legally covers',
      'National schemes and the 100,000-euro cap',
      'Five checks before placing funds abroad',
      'Comparison: how selected schemes are structured',
      'Common misunderstandings about EU deposit insurance',
      'Sources, supervisors and further reading',
    ],
    factsDe: [
      'Die gesetzliche Einlagensicherung in der Union beruht auf der Richtlinie 2014/49/EU. Sie verpflichtet Mitgliedstaaten, ein System vorzuhalten, das gedeckte Einlagen bis zu einem harmonisierten Höchstbetrag schützt.',
      'Das bekannte Limit von 100.000 Euro gilt je Kreditinstitut und je Einleger, nicht je Konto. Mehrere Konten bei derselben Bank werden in der Regel zusammengerechnet.',
      'Einlagensicherung ersetzt keine Solvenzaufsicht. Sie greift typischerweise, wenn ein Institut zahlungsunfähig ist und die zuständige Stelle den Entschädigungsfall feststellt.',
      'Auslandsfilialen einer EU-Bank können unter das Heimat- oder Aufnahmesystem fallen. Leser sollten den Rechtsträger im Kontovertrag prüfen, nicht nur die Marke auf der Website.',
      'Gemeinschaftskonten und Treuhandkonstruktionen werden oft anders gezählt als Einzelkonten. Die genaue Zählweise steht in den Merkblättern der jeweiligen Sicherungseinrichtung.',
      'EDIS als vollständige europäische Einlagensicherung bleibt politisch umstritten. Bis zu einer Einigung bleiben nationale Fonds und nationale Auszahlungspraxis entscheidend.',
      'Nicht jede Forderung gegen eine Bank ist eine gedeckte Einlage. Inhaberschuldverschreibungen, bestimmte strukturierte Produkte und Eigenmittelinstrumente fallen regelmäßig heraus.',
      'Die Auszahlungsfrist nach Feststellung des Entschädigungsfalls ist in der Richtlinie verkürzt worden. In der Praxis zählen Stichtag, Identifikation des Einlegers und vollständige Unterlagen.',
    ],
    factsEn: [
      'Statutory deposit insurance in the Union is based on Directive 2014/49/EU. Member states must maintain a scheme that protects covered deposits up to a harmonised ceiling.',
      'The familiar 100,000-euro cap applies per credit institution and per depositor, not per account. Multiple accounts at the same bank are usually aggregated.',
      'Deposit insurance does not replace solvency supervision. It typically applies once an institution is unable to repay and the competent body declares a compensation event.',
      'Foreign branches of an EU bank may fall under the home or host scheme. Readers should check the legal entity in the account contract, not only the brand on a website.',
      'Joint accounts and trust arrangements are often counted differently from individual accounts. The method is set out in the relevant scheme’s information sheets.',
      'A fully mutualised European deposit insurance scheme (EDIS) remains politically contested. Until then, national funds and national payout practice still matter.',
      'Not every claim on a bank is a covered deposit. Bearer bonds, certain structured products and own-funds instruments are regularly excluded.',
      'Payout deadlines after a compensation event have been shortened in the directive. In practice the record date, depositor identification and complete files still drive timing.',
    ],
    listDe: [
      'Rechtsträger und LEI der Bank im Vertrag notieren, nicht nur den Markennamen.',
      'Prüfen, welches nationale Sicherungssystem für diesen Rechtsträger zuständig ist.',
      'Gedeckte Einlagen von Wertpapierpositionen und anderen Forderungen trennen.',
      'Gesamtsaldo je Institut gegen das gesetzliche Limit halten, inklusive Gemeinschaftskonten.',
      'Offizielle Merkblätter der Sicherungseinrichtung zum Stichtag archivieren.',
      'Keine Marketingaussage als Ersatz für den Gesetzestext behandeln.',
    ],
    listEn: [
      'Record the bank’s legal entity and LEI from the contract, not only the brand name.',
      'Identify which national scheme is responsible for that legal entity.',
      'Separate covered deposits from securities holdings and other claims.',
      'Compare the aggregate balance per institution with the statutory cap, including joint accounts.',
      'Archive the scheme’s official information sheet as of the relevant date.',
      'Treat marketing copy as non-authoritative next to the legal text.',
    ],
    tableHeadersDe: ['System', 'Typische Deckungslogik', 'Worauf Leser achten'],
    tableHeadersEn: ['Scheme', 'Typical coverage logic', 'What readers should check'],
    tableRows: [
      ['EU-Harmonisierung', 'Richtlinie 2014/49/EU', 'Limit je Institut und Einleger'],
      ['Nationale Fonds', 'Auszahlung durch lokale Stelle', 'Zuständige Einrichtung nennen lassen'],
      ['Drittstaat', 'Eigenes nationales Recht', 'Deckungswährung und Verfahren prüfen'],
    ],
    faqDe: [
      {
        question: 'Gilt Einlagensicherung EU automatisch für jedes Konto in Europa?',
        answer:
          'Nein. Maßgeblich ist der beaufsichtigte Rechtsträger und das auf ihn anwendbare Sicherungssystem, nicht der Sitz des Kontoinhabers oder die Sprache der Website.',
      },
      {
        question: 'Zählen mehrere Konten bei derselben Bank getrennt?',
        answer:
          'In der Regel nein. Gedeckte Einlagen desselben Einlegers bei demselben Institut werden zusammengezählt, bis das gesetzliche Limit erreicht ist.',
      },
      {
        question: 'Schützt Einlagensicherung EU auch vor Währungsverlust?',
        answer:
          'Nein. Sie adressiert den Entschädigungsfall einer Bank, nicht Wechselkursänderungen einer Fremdwährungseinlage.',
      },
      {
        question: 'Was ist der Unterschied zwischen Einlagensicherung und Anlegerentschädigung?',
        answer:
          'Einlagensicherung betrifft gedeckte Bankeinlagen. Anlegerentschädigungssysteme betreffen bestimmte Wertpapierdienstleistungen und folgen anderen Richtlinien und Limits.',
      },
      {
        question: 'Wo findet man die zuständige Sicherungseinrichtung?',
        answer:
          'Im Informationsbogen zum Einlagensicherungssystem, den Kreditinstitute aushändigen müssen, sowie auf den Seiten der nationalen Aufsicht und der Sicherungseinrichtung selbst.',
      },
    ],
    faqEn: [
      {
        question: 'Does EU deposit insurance automatically cover every account in Europe?',
        answer:
          'No. The supervised legal entity and the scheme that applies to it are decisive, not the depositor’s residence or the language of a website.',
      },
      {
        question: 'Are multiple accounts at the same bank counted separately?',
        answer:
          'Usually not. Covered deposits of the same depositor at the same institution are aggregated up to the statutory cap.',
      },
      {
        question: 'Does EU deposit insurance also cover currency losses?',
        answer:
          'No. It addresses a bank compensation event, not exchange-rate moves on a foreign-currency deposit.',
      },
      {
        question: 'How does deposit insurance differ from investor compensation?',
        answer:
          'Deposit insurance covers eligible bank deposits. Investor-compensation schemes cover certain investment services under different rules and limits.',
      },
      {
        question: 'Where can readers find the competent scheme?',
        answer:
          'In the statutory information sheet banks must provide, and on the websites of the national supervisor and the scheme itself.',
      },
    ],
  },
  {
    id: 'bankratings-lesen',
    category: 'Finanzbildung',
    cluster: 'Finanzbildung',
    keywordDe: 'Bankratings lesen',
    keywordEn: 'reading bank ratings',
    titleDe: 'Bankratings lesen: Skalen, Grenzen und typische Fehler',
    titleEn: 'Reading bank ratings: scales, limits and typical mistakes',
    descriptionDe:
      'Bankratings lesen ohne Mythos: Was S&P, Moody’s und Fitch messen, was sie nicht messen und welche Angaben Leser 2026 zusätzlich brauchen.',
    descriptionEn:
      'Reading bank ratings without myths: what S&P, Moody’s and Fitch measure, what they omit, and which extra facts readers still need.',
    unsplashQuery: 'credit rating documents finance',
    headingsDe: [
      'Was Bankratings lesen in der Praxis bedeutet',
      'Issuer-, Issue- und Ausblickskennzeichen trennen',
      'Fünf Schritte, bevor ein Rating als Argument dient',
      'Vergleich der großen Agenturen in groben Zügen',
      'Typische Fehlschlüsse beim Bankratings lesen',
      'Aufsichtsdaten als Ergänzung zum Agentururteil',
    ],
    headingsEn: [
      'What reading bank ratings means in practice',
      'Separate issuer, issue and outlook labels',
      'Five steps before treating a rating as an argument',
      'A high-level comparison of the major agencies',
      'Typical mistakes when reading bank ratings',
      'Supervisory data as a complement to agency views',
    ],
    factsDe: [
      'Ein Rating ist eine Meinungsäußerung über relative Kreditwürdigkeit, keine Garantie und keine Kaufempfehlung. Agenturen beschreiben ihre Methoden in öffentlich zugänglichen Kriterienpapieren.',
      'Issuer Credit Ratings bewerten den Schuldner, Issue Ratings einzelne Instrumente. Nachrangige Verbindlichkeiten können deutlich unter dem Emittentenrating liegen.',
      'Outlook und Watchlist sind keine eigenen Noten, sondern Hinweise auf mögliche Richtung. Ein stabiler Ausblick ändert das aktuelle Rating selbst nicht.',
      'Nationale und internationale Skalen dürfen nicht unbesehen gleichgesetzt werden. Ein lokales AAA kann auf einer globalen Skala niedriger abgebildet sein.',
      'Bankratings enthalten Annahmen zu staatlicher Unterstützung. Änderungen der Abwicklungsregeln können diese Annahmen verschieben, ohne dass sich das Geschäftsmodell sofort ändert.',
      'Unsolicited Ratings beruhen oft auf öffentlichen Daten. Fehlende interne Informationen können zu konservativeren oder unvollständigen Einschätzungen führen.',
      'Ein einzelnes Ratingdatum ist ein Stichtag. Leser sollten das Veröffentlichungsdatum, die letzte Methodenänderung und etwaige Nachträge prüfen.',
      'Marktpreise nachrangiger Anleihen können Stress früher anzeigen als eine Ratingaktion. Ratings sind langsam, Spreads können schnell sein — beides sind unterschiedliche Signale.',
    ],
    factsEn: [
      'A rating is an opinion on relative creditworthiness, not a guarantee and not a recommendation to buy. Agencies publish their criteria in public methodology papers.',
      'Issuer credit ratings assess the borrower; issue ratings assess individual instruments. Subordinated liabilities can sit well below the issuer rating.',
      'Outlook and watchlist labels are not separate grades. They signal possible direction and do not by themselves change the current rating.',
      'National and global scales should not be treated as identical. A local AAA may map lower on a global scale.',
      'Bank ratings often embed assumptions about sovereign support. Resolution-law changes can shift those assumptions without an immediate business-model change.',
      'Unsolicited ratings often rely on public data. Missing internal information can make the view more conservative or incomplete.',
      'A rating is a snapshot. Readers should check the publication date, the last methodology change and any subsequent notices.',
      'Prices of subordinated bonds can show stress earlier than a rating action. Ratings move slowly, spreads can move fast — they are different signals.',
    ],
    listDe: [
      'Agentur, Skala (global oder national) und Stichtag dokumentieren.',
      'Issuer-Rating vom Rating der konkreten Verbindlichkeit unterscheiden.',
      'Outlook, Watch und letzte Methodenänderung gesondert notieren.',
      'Abhängigkeit von staatlicher Unterstützung in der Begründung suchen.',
      'Aufsichtliche Kennzahlen der Bank als zweiten Datensatz danebenlegen.',
      'Keine Ratingbuchstaben als Ersatz für den Kontovertrag verwenden.',
    ],
    listEn: [
      'Record the agency, the scale (global or national) and the as-of date.',
      'Distinguish the issuer rating from the rating of the specific liability.',
      'Note outlook, watch status and the last methodology change separately.',
      'Look in the rationale for dependence on sovereign support.',
      'Place supervisory ratios next to the agency opinion as a second dataset.',
      'Do not treat rating letters as a substitute for the account contract.',
    ],
    tableHeadersDe: ['Kennzeichen', 'Bedeutung', 'Lesefalle'],
    tableHeadersEn: ['Label', 'Meaning', 'Reading trap'],
    tableRows: [
      ['Issuer Rating', 'Schuldner insgesamt', 'Nicht mit Einzelinstrument verwechseln'],
      ['Issue Rating', 'Konkrete Verbindlichkeit', 'Nachrang kann abweichen'],
      ['Outlook / Watch', 'Mögliche Richtung', 'Ist keine neue Note'],
    ],
    faqDe: [
      {
        question: 'Ist ein hohes Bankrating eine Sicherheit wie Einlagensicherung?',
        answer:
          'Nein. Ratings sind Meinungen zur Kreditwürdigkeit. Gesetzliche Einlagensicherung folgt anderen Regeln und anderen Limits.',
      },
      {
        question: 'Warum weichen S&P, Moody’s und Fitch manchmal ab?',
        answer:
          'Methoden, Skalen, Zeitpunkte und Annahmen zu staatlicher Unterstützung unterscheiden sich. Abweichungen sind erwartbar, nicht automatisch ein Fehler.',
      },
      {
        question: 'Was bedeutet Investment Grade beim Bankratings lesen?',
        answer:
          'Es ist eine Konvention der Agenturskalen, keine gesetzliche Kategorie und keine Aussage über Liquidität oder operative Qualität einer Bank.',
      },
      {
        question: 'Kann ein Rating rückwirkend falsch gewesen sein?',
        answer:
          'Ratings sind stichtagsbezogen. Spätere Ausfälle widerlegen nicht, dass zum Veröffentlichungszeitpunkt eine bestimmte relative Einschätzung dokumentiert war.',
      },
      {
        question: 'Welche öffentliche Quelle ergänzt Agenturberichte?',
        answer:
          'Offenlegungen nach Aufsichtsrecht, Jahresabschlüsse und Register der zuständigen Notenbank oder Finanzaufsicht.',
      },
    ],
    faqEn: [
      {
        question: 'Is a high bank rating the same protection as deposit insurance?',
        answer:
          'No. Ratings are opinions on creditworthiness. Statutory deposit insurance follows different rules and different caps.',
      },
      {
        question: 'Why do S&P, Moody’s and Fitch sometimes differ?',
        answer:
          'Methodologies, scales, timing and sovereign-support assumptions differ. Divergence is expected, not automatically an error.',
      },
      {
        question: 'What does investment grade mean when reading bank ratings?',
        answer:
          'It is a convention on agency scales, not a legal category and not a statement about a bank’s liquidity or operational quality.',
      },
      {
        question: 'Can a rating turn out to have been wrong?',
        answer:
          'Ratings are point-in-time opinions. Later defaults do not erase that a relative view was documented on the publication date.',
      },
      {
        question: 'Which public sources complement agency reports?',
        answer:
          'Prudential disclosures, financial statements and the registers of the competent central bank or supervisor.',
      },
    ],
  },
  {
    id: 'kyc-bankenpruefung',
    category: 'Sicherheit',
    cluster: 'Sicherheit',
    keywordDe: 'KYC Prüfung Banken',
    keywordEn: 'bank KYC checks',
    titleDe: 'KYC Prüfung Banken: Warum Nachweise verlangt werden',
    titleEn: 'Bank KYC checks: why institutions ask for documents',
    descriptionDe:
      'KYC Prüfung Banken erklärt: Identifizierung, wirtschaftlich Berechtigte, Quellenfragen und typische Ablehnungsgründe. Bildungsartikel ohne Werbe-CTA.',
    descriptionEn:
      'Bank KYC checks explained: identification, beneficial owners, source-of-funds questions and typical declines without account-opening ads.',
    unsplashQuery: 'kyc compliance documents desk',
    headingsDe: [
      'Was eine KYC Prüfung Banken rechtlich anstoßen soll',
      'Identität, wirtschaftlich Berechtigte und Geschäftsbeziehung',
      'Fünf Unterlagen, die Institute regelmäßig anfordern',
      'Vergleich: Standard- versus vertiefte Sorgfalt',
      'Warum eine KYC Prüfung Banken scheitern kann',
      'Aufsichtliche Erwartungen und Leserfragen',
    ],
    headingsEn: [
      'What bank KYC checks are meant to achieve',
      'Identity, beneficial owners and the business relationship',
      'Five documents institutions commonly request',
      'Comparison: standard versus enhanced due diligence',
      'Why a bank KYC check can fail',
      'Supervisory expectations and reader questions',
    ],
    factsDe: [
      'KYC steht für Know Your Customer. Kreditinstitute müssen Kunden identifizieren, die Geschäftsbeziehung nachvollziehen und Auffälligkeiten an die Financial Intelligence Unit melden können.',
      'Die Pflicht trifft den Verpflichteten, nicht den Kunden als Strafsubjekt. Fehlende Mitwirkung kann dennoch dazu führen, dass eine Beziehung nicht begründet oder beendet wird.',
      'Wirtschaftlich Berechtigte müssen bei juristischen Personen offengelegt werden. Strohmanngesellschaften ohne klare Eigentümerkette gelten als erhöhtes Risiko.',
      'Quellen- und Mittelherkunftsfragen zielen auf Plausibilität, nicht auf eine Renditediskussion. Gehaltsabrechnungen, Verkaufsverträge oder Steuerbescheide sind typische Belege.',
      'Politisch exponierte Personen unterliegen verstärkter Sorgfalt. Das ist eine gesetzliche Kategorie, keine moralische Bewertung der Person.',
      'Video-Ident und elektronische Verfahren ersetzen nicht die inhaltliche Prüfung. Ein gültiger Ausweis ohne stimmige Adresse oder ohne erklärbaren Zweck reicht oft nicht.',
      'Korrespondenzbanken und Zahlungsdienstleister können zusätzliche Fragen stellen, obwohl das kontoführende Institut bereits geprüft hat. Die Kette ist länger als ein einzelnes Formular.',
      'Aufbewahrungsfristen für KYC-Akten folgen Geldwäsche- und Handelsrecht. Institute dürfen Unterlagen nicht beliebig früh löschen, auch wenn der Kunde das wünscht.',
    ],
    factsEn: [
      'KYC means know your customer. Credit institutions must identify customers, understand the relationship and be able to report suspicions to the financial intelligence unit.',
      'The duty sits on the obliged entity, not on the customer as a criminal defendant. Lack of cooperation can still mean a relationship is not opened or is terminated.',
      'Beneficial owners of legal persons must be disclosed. Shell structures without a clear ownership chain are treated as higher risk.',
      'Source-of-funds questions test plausibility, not expected return. Payslips, sale contracts or tax assessments are typical evidence.',
      'Politically exposed persons are subject to enhanced due diligence. That is a legal category, not a moral judgement of the person.',
      'Video identification and e-ID do not replace substance checks. A valid ID without a consistent address or a credible purpose is often insufficient.',
      'Correspondent banks and payment firms may ask extra questions even after the account bank has already checked. The chain is longer than a single form.',
      'Retention periods for KYC files follow AML and commercial law. Institutions often cannot delete records early just because a customer asks.',
    ],
    listDe: [
      'Gültiges Ausweisdokument mit maschinenlesbarem Datensatz bereithalten.',
      'Aktuelle Wohnsitzadresse mit einem unabhängigen Beleg stützen.',
      'Bei Firmen die Eigentümerkette bis zur natürlichen Person dokumentieren.',
      'Herkunft größerer Beträge mit Verträgen oder Kontoauszügen erklären.',
      'Zweck der Geschäftsbeziehung in einem Satz klar benennen.',
      'Widersprüche zwischen Formular, Belegen und öffentlichem Register vermeiden.',
    ],
    listEn: [
      'Keep a valid ID document with a machine-readable zone ready.',
      'Support the current residential address with an independent document.',
      'For companies, document the ownership chain down to a natural person.',
      'Explain the origin of larger amounts with contracts or statements.',
      'State the purpose of the relationship in one clear sentence.',
      'Avoid contradictions between forms, evidence and public registers.',
    ],
    tableHeadersDe: ['Prüfebene', 'Typischer Inhalt', 'Häufige Lücke'],
    tableHeadersEn: ['Layer', 'Typical content', 'Common gap'],
    tableRows: [
      ['Identifizierung', 'Ausweis, Registerauszug', 'Abgelaufene Dokumente'],
      ['Wirtschaftlich Berechtigte', 'Eigentümerkette', 'Undurchsichtige Holdings'],
      ['Mittelherkunft', 'Plausible Belege', 'Unbelegte Barzuflüsse'],
    ],
    faqDe: [
      {
        question: 'Ist eine KYC Prüfung Banken optional, wenn man schon Kunde ist?',
        answer:
          'Nein. Sorgfaltspflichten gelten fortlaufend. Institute müssen Daten aktualisieren, wenn sich Risiko, Eigentum oder Zweck ändern.',
      },
      {
        question: 'Warum fragen Banken nach der Herkunft von Geld?',
        answer:
          'Weil Geldwäsche- und Sanktionsrecht Plausibilität verlangen. Die Frage ist gesetzlich motiviert, nicht eine Zins- oder Produktdiskussion.',
      },
      {
        question: 'Kann man KYC mit einer Vollmacht umgehen?',
        answer:
          'Nein. Vertreter müssen selbst identifiziert werden, und der wirtschaftlich Berechtigte bleibt offenzulegen.',
      },
      {
        question: 'Was passiert bei unvollständigen Unterlagen?',
        answer:
          'Die Beziehung darf oft nicht begründet oder nicht fortgeführt werden. Das ist eine gesetzliche Konsequenz, kein reines Serviceproblem.',
      },
      {
        question: 'Unterscheidet sich KYC für Unternehmen von Privatkunden?',
        answer:
          'Ja. Juristische Personen erfordern Registerdaten, Vertretungsnachweise und die Feststellung wirtschaftlich Berechtigter.',
      },
    ],
    faqEn: [
      {
        question: 'Are bank KYC checks optional for existing customers?',
        answer:
          'No. Due diligence is ongoing. Institutions must update files when risk, ownership or purpose changes.',
      },
      {
        question: 'Why do banks ask where money comes from?',
        answer:
          'AML and sanctions law require plausibility. The question is legal, not a discussion of interest rates or products.',
      },
      {
        question: 'Can a power of attorney bypass KYC?',
        answer:
          'No. Representatives must be identified as well, and the beneficial owner still has to be disclosed.',
      },
      {
        question: 'What happens if documents are incomplete?',
        answer:
          'The relationship often cannot be opened or continued. That is a legal consequence, not merely a service issue.',
      },
      {
        question: 'Is KYC different for companies and individuals?',
        answer:
          'Yes. Legal persons require registry data, proof of authority and identification of beneficial owners.',
      },
    ],
  },
  {
    id: 'crs-meldepflichten',
    category: 'B2B',
    cluster: 'B2B',
    keywordDe: 'CRS Meldepflichten Unternehmen',
    keywordEn: 'CRS reporting for companies',
    titleDe: 'CRS Meldepflichten Unternehmen: Wer legt was offen 2026',
    titleEn: 'CRS reporting for companies: who discloses what',
    descriptionDe:
      'CRS Meldepflichten Unternehmen im Überblick: Finanzinstitute, steuerlicher Wohnsitz, Controlling Persons und typische Fehler in der Selbstauskunft.',
    descriptionEn:
      'CRS reporting for companies: financial institutions, tax residence, controlling persons and typical self-certification errors.',
    unsplashQuery: 'corporate tax reporting office',
    headingsDe: [
      'Was CRS Meldepflichten Unternehmen auslösen',
      'Meldepflichtige Institute und nichtfinanzielle Gesellschaften',
      'Fünf Angaben, die Selbstauskünfte häufig falsch machen',
      'Vergleich: CRS und FATCA in der betrieblichen Praxis',
      'Folgen unvollständiger CRS-Daten für Kontobeziehungen',
      'Dokumentation, Fristen und interne Zuständigkeit',
    ],
    headingsEn: [
      'What CRS reporting for companies actually triggers',
      'Reporting institutions and non-financial entities',
      'Five fields self-certifications often get wrong',
      'Comparison: CRS and FATCA in day-to-day operations',
      'Consequences of incomplete CRS data for account relationships',
      'Documentation, deadlines and internal ownership',
    ],
    factsDe: [
      'Der Common Reporting Standard der OECD verpflichtet teilnehmende Staaten, Finanzkonten steuerlich relevanter Personen automatisch auszutauschen. Unternehmen begegnen CRS vor allem als Kontoinhaber oder als meldendes Finanzinstitut.',
      'Ob eine Gesellschaft selbst meldendes Finanzinstitut ist, hängt von Tätigkeit, Einkünften und Aufenthaltsort ab. Eine Holding mit passiven Einkünften wird oft anders klassifiziert als ein operatives Industrieunternehmen.',
      'Self-Certification-Formulare verlangen steuerliche Ansässigkeit und TIN. Widersprüche zum Handelsregister oder zu der tatsächlichen Geschäftsleitung sind ein klassischer Nachfasspunkt der Bank.',
      'Controlling Persons passiver NFE müssen identifiziert werden. Das ist nicht identisch mit dem wirtschaftlich Berechtigten nach Geldwäscherecht, überschneidet sich aber häufig.',
      'CRS ersetzt keine nationale Buchhaltung. Jahresabschluss, USt-ID und steuerliche Ansässigkeit bleiben getrennte Pflichtenkreise.',
      'FATCA betrifft US-Personen und US-Indizien. Ein Unternehmen ohne US-Bezug kann trotzdem FATCA-Formulare sehen, weil Korrespondenzbanken standardisierte Pakete verlangen.',
      'Falsche Klassifizierung als Active NFE trotz überwiegend passiver Einkünfte ist ein häufiger Fehler. Die Schwellen in den Kommentaren zum CRS sind nachzulesen, nicht zu schätzen.',
      'Interne Zuständigkeit liegt selten nur in der Buchhaltung. Treasury, Steuerabteilung und die Person, die Bankvollmacht hat, müssen denselben Datensatz verwenden.',
    ],
    factsEn: [
      'The OECD Common Reporting Standard requires participating states to exchange financial-account data of tax-relevant persons automatically. Companies meet CRS as account holders or as reporting financial institutions.',
      'Whether an entity itself is a reporting financial institution depends on activity, income and residence. A holding with passive income is often classified differently from an operating industrial company.',
      'Self-certification forms ask for tax residence and TIN. Contradictions with the commercial register or the place of effective management are a classic follow-up point for banks.',
      'Controlling persons of passive NFEs must be identified. That is not identical to the AML beneficial owner, but the two often overlap.',
      'CRS does not replace national bookkeeping. Financial statements, VAT IDs and tax residence remain separate duty sets.',
      'FATCA concerns US persons and US indicia. A company without a US nexus may still see FATCA forms because correspondent banks demand standardised packs.',
      'Mis-classifying an entity as an Active NFE despite mostly passive income is a common error. CRS commentary thresholds should be read, not guessed.',
      'Internal ownership rarely sits only in accounting. Treasury, tax and the person with bank authority must use the same data set.',
    ],
    listDe: [
      'Steuerliche Ansässigkeit jeder Kontoinhaber-Gesellschaft schriftlich festhalten.',
      'TIN und Registerdaten gegen das aktuelle Handelsregister prüfen.',
      'Klassifizierung Active versus Passive NFE anhand der Einkunftsstruktur begründen.',
      'Controlling Persons mit Wohnsitzstaaten und TIN listen.',
      'FATCA-Indizien gesondert abarbeiten, nicht mit CRS vermischen.',
      'Eine interne Version der Selbstauskunft mit Datum und Unterschrift archivieren.',
    ],
    listEn: [
      'Record the tax residence of each account-holding company in writing.',
      'Check TINs and registry data against the current commercial register.',
      'Document Active versus Passive NFE status from the income mix.',
      'List controlling persons with residence jurisdictions and TINs.',
      'Work FATCA indicia separately rather than merging them into CRS.',
      'Archive an internal copy of the self-certification with date and signature.',
    ],
    tableHeadersDe: ['Rolle', 'CRS-Frage', 'Typische Quelle'],
    tableHeadersEn: ['Role', 'CRS question', 'Typical source'],
    tableRows: [
      ['Kontoinhaber', 'Ansässigkeit und TIN', 'Steuerbescheid, Register'],
      ['Passive NFE', 'Controlling Persons', 'Gesellschafterliste'],
      ['Finanzinstitut', 'Meldung an Behörde', 'Interne Klassifizierung'],
    ],
    faqDe: [
      {
        question: 'Gelten CRS Meldepflichten Unternehmen nur für Banken?',
        answer:
          'Nein. Bestimmte Investmentgesellschaften und andere Finanzinstitute können selbst meldend sein. Operative Firmen sind meist Kontoinhaber, nicht meldende Institute.',
      },
      {
        question: 'Was ist eine Passive NFE?',
        answer:
          'Eine nichtfinanzielle Gesellschaft, deren Einkünfte oder Vermögenswerte überwiegend passiv sind. Dann müssen Controlling Persons für den Informationsaustausch bestimmt werden.',
      },
      {
        question: 'Ersetzt CRS die deutsche Steuererklärung?',
        answer:
          'Nein. Der automatische Austausch informiert Steuerverwaltungen. Die Erklärungspflicht des Steuerpflichtigen bleibt bestehen.',
      },
      {
        question: 'Warum verlangt die Bank eine neue Selbstauskunft?',
        answer:
          'Bei Änderung von Ansässigkeit, Eigentum oder Klassifizierung muss der Datensatz aktualisiert werden. Institute dürfen sich nicht auf veraltete Formulare verlassen.',
      },
      {
        question: 'Was droht bei bewusst falschen Angaben?',
        answer:
          'Neben bankseitiger Beendigung der Beziehung können steuerliche und bußgeldrechtliche Folgen nach nationalem Recht eintreten. Das ist keine Anlagerfrage.',
      },
    ],
    faqEn: [
      {
        question: 'Does CRS reporting for companies apply only to banks?',
        answer:
          'No. Certain investment entities and other financial institutions can themselves be reporting. Operating companies are usually account holders, not reporting institutions.',
      },
      {
        question: 'What is a Passive NFE?',
        answer:
          'A non-financial entity whose income or assets are predominantly passive. Controlling persons must then be identified for information exchange.',
      },
      {
        question: 'Does CRS replace a domestic tax return?',
        answer:
          'No. Automatic exchange informs tax administrations. The taxpayer’s filing duty remains.',
      },
      {
        question: 'Why does the bank ask for a new self-certification?',
        answer:
          'When residence, ownership or classification changes, the file must be updated. Institutions must not rely on stale forms.',
      },
      {
        question: 'What follows from deliberately false information?',
        answer:
          'Besides a possible end of the banking relationship, tax and penalty consequences can arise under national law. This is not an investment question.',
      },
    ],
  },
  {
    id: 'liquiditaetsreserve',
    category: 'B2B',
    cluster: 'B2B',
    keywordDe: 'Liquiditätsreserve Unternehmen',
    keywordEn: 'corporate liquidity reserve',
    titleDe: 'Liquiditätsreserve Unternehmen: Planung ohne Renditeversprechen',
    titleEn: 'Corporate liquidity reserve: planning without yield promises',
    descriptionDe:
      'Liquiditätsreserve Unternehmen: Laufzeiten, Konzentrationsrisiko, Zahlungsfähigkeit und Governance — ein Bildungsrahmen statt Produktempfehlung.',
    descriptionEn:
      'Corporate liquidity reserve: tenors, concentration, solvency and governance — an educational frame rather than a product pitch.',
    unsplashQuery: 'corporate treasury planning',
    headingsDe: [
      'Was eine Liquiditätsreserve Unternehmen leisten soll',
      'Laufzeit, Währung und Zahlungsfähigkeit trennen',
      'Fünf Governance-Fragen an die Geschäftsleitung',
      'Vergleich: operative Kasse versus gebundene Mittel',
      'Konzentrations- und Gegenparteirisiken in der Reserve',
      'Dokumentation für Steuer, Audit und Banken',
    ],
    headingsEn: [
      'What a corporate liquidity reserve is meant to do',
      'Separate tenor, currency and solvency',
      'Five governance questions for management',
      'Comparison: operating cash versus committed funds',
      'Concentration and counterparty risk inside the reserve',
      'Documentation for tax, audit and banks',
    ],
    factsDe: [
      'Eine Liquiditätsreserve Unternehmen dient zuerst der Zahlungsfähigkeit: Löhne, Steuern, Lieferanten und Kreditraten. Renditeziele sind nachrangig und gehören nicht in denselben Entscheidungssatz.',
      'Die passende Größe hängt vom Umsatzzyklus, von Saisonalität und von zugesagten Kreditlinien ab. Branchenvergleiche ersetzen keine eigene Cashflow-Prognose.',
      'Gebundene Mittel mit Kündigungsfrist sind keine operative Kasse. Wer Rechnungen in sieben Tagen zahlt, braucht Zugriff, der zu diesem Horizont passt.',
      'Währungsinkongruenz zwischen Einnahmen und Reserve erzeugt ein eigenes Risiko. Eine Reserve in einer anderen Währung als die Kostenbasis kann im Stressfall teuer umgetauscht werden müssen.',
      'Konzentration auf ein einziges Institut erhöht das operationelle Risiko, selbst wenn rechtliche Deckung greift. Interne Limits je Gegenpartei sind eine Governance-Entscheidung.',
      'Gesellschafterdarlehen und Intercompany-Konten können Liquidität vortäuschen, die rechtlich nicht frei ist. Verträge und Aufrechnungslagen gehören in die Betrachtung.',
      'Steuerliche Behandlung von Zinserträgen und Quellensteuer ist von der Liquiditätsplanung zu trennen, aber nicht zu ignorieren. Die Treasury-Richtlinie sollte den Steuerhinweis enthalten.',
      'Banken fragen in der Kreditprüfung nach der Reserve. Eine nachvollziehbare Richtlinie ist oft wertvoller als eine einzelne Screenshot-Saldoangabe.',
    ],
    factsEn: [
      'A corporate liquidity reserve exists first to keep the firm solvent: payroll, taxes, suppliers and loan instalments. Return targets are secondary and do not belong in the same decision sentence.',
      'The right size depends on the revenue cycle, seasonality and committed credit lines. Peer benchmarks do not replace a firm-specific cash-flow forecast.',
      'Committed funds with notice periods are not operating cash. If invoices are due in seven days, access must match that horizon.',
      'A currency mismatch between revenues and the reserve is a separate risk. Stress can force a costly conversion if costs sit in another currency.',
      'Concentration in a single institution raises operational risk even where legal coverage exists. Internal limits per counterparty are a governance choice.',
      'Shareholder loans and intercompany accounts can mimic liquidity that is not legally free. Contracts and set-off rights belong in the analysis.',
      'Tax treatment of interest and withholding tax is distinct from liquidity planning but should not be ignored. The treasury policy should mention it.',
      'Banks ask about the reserve in credit reviews. A documented policy is often more useful than a single screenshot of a balance.',
    ],
    listDe: [
      'Zahlungsverpflichtungen der nächsten 30, 90 und 180 Tage listen.',
      'Zugriffshorizont jeder Position (sofort, Frist, gebunden) markieren.',
      'Währung der Reserve an die Kostenwährung koppeln oder bewusst hedgen.',
      'Limit je Kreditinstitut intern festlegen und jährlich prüfen.',
      'Zuständigkeit zwischen Geschäftsführung, Treasury und Steuer definieren.',
      'Die Richtlinie datieren, versionieren und dem Auditor zugänglich machen.',
    ],
    listEn: [
      'List payment obligations for the next 30, 90 and 180 days.',
      'Tag each position’s access horizon (instant, notice, committed).',
      'Align reserve currency with the cost currency or hedge it deliberately.',
      'Set an internal limit per credit institution and review it annually.',
      'Define ownership between management, treasury and tax.',
      'Date and version the policy and make it available to the auditor.',
    ],
    tableHeadersDe: ['Reserve-Teil', 'Zweck', 'Typisches Risiko'],
    tableHeadersEn: ['Reserve slice', 'Purpose', 'Typical risk'],
    tableRows: [
      ['Operative Kasse', 'Laufende Rechnungen', 'Zu geringe Puffer'],
      ['Fristige Mittel', 'Planbare Steuern', 'Kündigungsfrist zu lang'],
      ['Fremdwährung', 'Matching der Erlöse', 'Kursbewegung gegen Kosten'],
    ],
    faqDe: [
      {
        question: 'Gibt es eine gesetzliche Quote für die Liquiditätsreserve Unternehmen?',
        answer:
          'Eine allgemein gültige Prozentzahl für alle Branchen existiert nicht. Maßgeblich sind Zahlungsfähigkeit, Verträge und — bei regulierten Instituten — aufsichtliche Liquiditätsregeln.',
      },
      {
        question: 'Ist eine Kreditlinie ein Ersatz für eine Reserve?',
        answer:
          'Eine zugesagte Linie kann Teil der Planung sein, ist aber kündbar oder an Covenants gebunden. Sie ist kein identischer Ersatz für frei verfügbare Mittel.',
      },
      {
        question: 'Sollen Gesellschafter die Reserve privat halten?',
        answer:
          'Privates Vermögen der Gesellschafter ist rechtlich nicht das Vermögen der Gesellschaft. Gläubiger und Auditoren betrachten die Firma, nicht das Haushaltskonto.',
      },
      {
        question: 'Wie oft sollte die Richtlinie überprüft werden?',
        answer:
          'Mindestens jährlich sowie nach wesentlichen Änderungen von Umsatz, Finanzierung oder Zahlungszielen der Lieferanten.',
      },
      {
        question: 'Gehört die Reserve in den Lagebericht?',
        answer:
          'Wesentliche Liquiditätsrisiken gehören in die Berichterstattung, soweit Handels- und Gesellschaftsrecht das verlangen. Die interne Richtlinie ist die Arbeitsgrundlage.',
      },
    ],
    faqEn: [
      {
        question: 'Is there a statutory ratio for a corporate liquidity reserve?',
        answer:
          'There is no single percentage for every industry. Solvency, contracts and — for regulated firms — prudential liquidity rules are decisive.',
      },
      {
        question: 'Is a credit line a substitute for a reserve?',
        answer:
          'A committed line can be part of the plan, but it may be cancellable or covenant-bound. It is not identical to freely available cash.',
      },
      {
        question: 'Should shareholders hold the reserve privately?',
        answer:
          'Private wealth of shareholders is not company property. Creditors and auditors look at the firm, not a household account.',
      },
      {
        question: 'How often should the policy be reviewed?',
        answer:
          'At least annually and after material changes in revenue, financing or supplier payment terms.',
      },
      {
        question: 'Does the reserve belong in the management report?',
        answer:
          'Material liquidity risks belong in reporting where company and accounting law require it. The internal policy is the working document.',
      },
    ],
  },
  {
    id: 'waehrungsrisiko-einlagen',
    category: 'Finanzbildung',
    cluster: 'Finanzbildung',
    keywordDe: 'Währungsrisiko Einlagen',
    keywordEn: 'deposit currency risk',
    titleDe: 'Währungsrisiko Einlagen: Umrechnung, Limits, Dokumentation',
    titleEn: 'Deposit currency risk: conversion, limits and records',
    descriptionDe:
      'Währungsrisiko Einlagen verstehen: nominale Zinsen, reale Kaufkraft in Euro, Sicherungsinstrumente und Grenzen der Einlagensicherung 2026.',
    descriptionEn:
      'Deposit currency risk explained: nominal interest, euro purchasing power, hedging tools and the limits of deposit insurance.',
    unsplashQuery: 'foreign currency exchange finance',
    headingsDe: [
      'Was Währungsrisiko Einlagen von Kreditrisiko unterscheidet',
      'Nominale Verzinsung versus Kaufkraft in der Heimatwährung',
      'Fünf Angaben, die vor einer Fremdwährungseinlage fehlen dürfen',
      'Vergleich: ungesichert, intern begrenzt, extern abgesichert',
      'Einlagensicherung deckt keinen Wechselkurs',
      'Quellen für Kurse, Spreads und Stichtage',
    ],
    headingsEn: [
      'How deposit currency risk differs from credit risk',
      'Nominal interest versus purchasing power in the home currency',
      'Five facts that must not be missing before a foreign-currency deposit',
      'Comparison: unhedged, internally limited, externally hedged',
      'Deposit insurance does not cover the exchange rate',
      'Sources for rates, spreads and as-of dates',
    ],
    factsDe: [
      'Währungsrisiko Einlagen entsteht, wenn die Einlagewährung von der Währung abweicht, in der der Anleger denkt, plant oder steuert. Ein fester Nominalzins ändert dieses Risiko nicht.',
      'Die Umrechnung erfolgt zum jeweiligen Markt- oder Bankkurs inklusive Spread. Der Mittelkurs aus Nachrichtenportalen ist selten der ausführbare Kurs.',
      'Einlagensicherung, sofern sie greift, entschädigt in der Regel in der Währung des Sicherungssystems oder nach dessen Regeln — nicht automatisch in Euro zum Wunschkurs.',
      'Interne Limits (Höchstanteil Fremdwährung am Gesamtvermögen) sind eine Disziplinregel, kein Hedge. Sie begrenzen Schadengröße, eliminieren Bewegung nicht.',
      'Devisentermingeschäfte und Optionen sind eigene Verträge mit eigenen Kosten, Margins und Kontrahenten. Sie gehören nicht stillschweigend zur Bankeinlage.',
      'Zinsdifferenzen zwischen Währungen reflektieren oft Inflations- und Zinserwartungen. Eine höhere Nominalquote in einer anderen Währung ist kein risikofreier Aufschlag.',
      'Steuerliche Behandlung von Wechselkursgewinnen und -verlusten folgt nationalem Recht und kann von der Behandlung der Zinsen abweichen. Das ist ein Dokumentationspunkt für den Steuerberater.',
      'Historische Charts ohne Spread, ohne Handelszeit und ohne Regimewechsel (Kapitalverkehrskontrollen) führen zu falscher Sicherheit. Leser brauchen den Stichtag und die Quelle.',
    ],
    factsEn: [
      'Deposit currency risk arises when the deposit currency differs from the currency in which the holder thinks, plans or reports. A fixed nominal rate does not remove that risk.',
      'Conversion uses a market or bank rate including spread. A mid-market print from a news site is rarely the executable rate.',
      'Where deposit insurance applies, compensation follows the scheme’s currency rules — not automatically euros at a preferred rate.',
      'Internal caps (maximum foreign-currency share of wealth) are a discipline rule, not a hedge. They bound loss size; they do not stop moves.',
      'Forwards and options are separate contracts with costs, margin and counterparties. They are not silently part of the bank deposit.',
      'Interest differentials often embed inflation and rate expectations. A higher nominal quote in another currency is not a risk-free add-on.',
      'Tax treatment of FX gains and losses follows national law and may differ from the treatment of interest. That is a documentation point for a tax adviser.',
      'Historical charts without spread, without trading hours and without regime shifts (capital controls) create false comfort. Readers need the as-of date and the source.',
    ],
    listDe: [
      'Heimatwährung der Planung (zum Beispiel Euro) ausdrücklich festlegen.',
      'Einlagewährung, Kontoverrechnungswährung und Steuerwährung getrennt notieren.',
      'Ausführbaren Bid/Ask-Spread der Hausbank am Stichtag dokumentieren.',
      'Anteil Fremdwährung am Gesamtvermögen gegen ein internes Limit halten.',
      'Prüfen, ob Sicherung und Entschädigung in derselben Währung erfolgen.',
      'Keine Zinsangabe ohne Zeitraum, Währung und Brutto/Netto-Klarstellung verwenden.',
    ],
    listEn: [
      'State the planning currency (for example euro) explicitly.',
      'Record deposit currency, account settlement currency and tax currency separately.',
      'Document the executable bid/ask spread of the house bank on the as-of date.',
      'Keep the foreign-currency share of wealth against an internal cap.',
      'Check whether insurance and compensation are in the same currency.',
      'Never quote a rate without tenor, currency and gross/net clarification.',
    ],
    tableHeadersDe: ['Ebene', 'Was schwankt', 'Was nicht automatisch schützt'],
    tableHeadersEn: ['Layer', 'What moves', 'What does not automatically protect'],
    tableRows: [
      ['Kreditrisiko', 'Zahlungsfähigkeit der Bank', 'Wechselkurs'],
      ['Währungsrisiko', 'Kurs zur Heimatwährung', 'Nominale Verzinsung'],
      ['Sicherungssystem', 'Entschädigungsfall', 'Kaufkraft in Euro'],
    ],
    faqDe: [
      {
        question: 'Ist Währungsrisiko Einlagen dasselbe wie Bankrisiko?',
        answer:
          'Nein. Bankrisiko betrifft den Schuldner. Währungsrisiko betrifft die Umrechnung in die Planungswährung, auch wenn die Bank vollständig zahlt.',
      },
      {
        question: 'Gleicht ein höherer Nominalzins das Währungsrisiko aus?',
        answer:
          'Nicht automatisch. Zinsdifferenzen können genau das Währungsrisiko einpreisen. Ein Vergleich braucht denselben Zeitraum und dieselbe Zielwährung.',
      },
      {
        question: 'Schützt ein Euro-Konto vor Währungsrisiko Einlagen?',
        answer:
          'Ein Konto in Euro vermeidet das Umrechnungsrisiko gegenüber Euro, nicht andere Risiken wie Kredit- oder operationelle Risiken.',
      },
      {
        question: 'Was ist ein interner Währungslimit?',
        answer:
          'Eine selbst gesetzte Obergrenze für den Anteil von Fremdwährungspositionen. Sie ist Governance, kein Derivat.',
      },
      {
        question: 'Welche Quelle eignet sich für den Stichtagskurs?',
        answer:
          'Der tatsächlich ausführbare Kurs des kontoführenden Instituts oder ein dokumentierter Referenzkurs einer Zentralbank, jeweils mit Uhrzeit und Spread-Hinweis.',
      },
    ],
    faqEn: [
      {
        question: 'Is deposit currency risk the same as bank risk?',
        answer:
          'No. Bank risk is about the debtor. Currency risk is about conversion into the planning currency even if the bank pays in full.',
      },
      {
        question: 'Does a higher nominal rate offset deposit currency risk?',
        answer:
          'Not automatically. Interest differentials may price that risk in. A comparison needs the same tenor and the same target currency.',
      },
      {
        question: 'Does a euro account remove deposit currency risk?',
        answer:
          'A euro account removes conversion risk versus euro. It does not remove credit or operational risk.',
      },
      {
        question: 'What is an internal currency cap?',
        answer:
          'A self-imposed ceiling on the share of foreign-currency positions. It is governance, not a derivative.',
      },
      {
        question: 'Which source is appropriate for the as-of rate?',
        answer:
          'The executable rate of the account bank or a documented central-bank reference, each with a timestamp and a spread note.',
      },
    ],
  },
];

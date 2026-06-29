type Props = { className?: string };

export function StepKycIllustration({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 320 200" fill="none" className={className} aria-hidden>
      <rect width="320" height="200" fill="#EDEDFC" rx="12" />
      <rect x="40" y="50" width="100" height="70" rx="8" fill="#3B3BE8" opacity="0.15" stroke="#3B3BE8" strokeWidth="2" />
      <rect x="52" y="62" width="36" height="28" rx="4" fill="#3B3BE8" opacity="0.3" />
      <circle cx="88" cy="98" r="10" fill="#3B3BE8" opacity="0.4" />
      <rect x="52" y="108" width="76" height="4" rx="2" fill="#3B3BE8" opacity="0.25" />
      <rect x="52" y="116" width="56" height="4" rx="2" fill="#3B3BE8" opacity="0.2" />
      <rect x="180" y="40" width="90" height="150" rx="12" fill="white" stroke="#3B3BE8" strokeWidth="2" />
      <rect x="195" y="55" width="60" height="8" rx="4" fill="#3B3BE8" opacity="0.2" />
      <circle cx="225" cy="100" r="22" fill="#3B3BE8" opacity="0.15" stroke="#3B3BE8" strokeWidth="2" />
      <circle cx="225" cy="95" r="8" fill="#3B3BE8" opacity="0.4" />
      <path d="M210 115 Q225 125 240 115" stroke="#3B3BE8" strokeWidth="2" fill="none" opacity="0.4" />
      <rect x="195" y="140" width="60" height="30" rx="6" fill="#3B3BE8" opacity="0.15" />
      <path d="M148 85 L172 85" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 3" />
      <polygon points="172,80 180,85 172,90" fill="#7C3AED" />
    </svg>
  );
}

export function StepPortfolioIllustration({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 320 200" fill="none" className={className} aria-hidden>
      <rect width="320" height="200" fill="#F3EEFF" rx="12" />
      <circle cx="120" cy="100" r="55" fill="white" stroke="#7C3AED" strokeWidth="2" />
      <path d="M120 55 A45 45 0 0 1 155 120 L120 100 Z" fill="#3B3BE8" opacity="0.7" />
      <path d="M120 100 L155 120 A45 45 0 0 1 85 120 Z" fill="#7C3AED" opacity="0.7" />
      <path d="M120 100 L85 120 A45 45 0 0 1 120 55 Z" fill="#0891B2" opacity="0.6" />
      <circle cx="120" cy="100" r="18" fill="white" />
      <ellipse cx="230" cy="130" rx="70" ry="40" fill="#0891B2" opacity="0.12" stroke="#0891B2" strokeWidth="1.5" />
      <ellipse cx="230" cy="130" rx="50" ry="28" fill="#0891B2" opacity="0.08" stroke="#0891B2" strokeWidth="1" />
      <circle cx="200" cy="115" r="4" fill="#7C3AED" />
      <circle cx="230" cy="105" r="4" fill="#3B3BE8" />
      <circle cx="260" cy="120" r="4" fill="#0891B2" />
      <circle cx="215" cy="140" r="4" fill="#7C3AED" />
      <circle cx="250" cy="145" r="4" fill="#3B3BE8" />
    </svg>
  );
}

export function StepInterestIllustration({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 320 200" fill="none" className={className} aria-hidden>
      <rect width="320" height="200" fill="#E6F7FA" rx="12" />
      <rect x="50" y="60" width="130" height="80" rx="10" fill="white" stroke="#0891B2" strokeWidth="2" />
      <rect x="62" y="72" width="30" height="22" rx="4" fill="#0891B2" opacity="0.3" />
      <rect x="62" y="105" width="106" height="8" rx="3" fill="#0891B2" opacity="0.15" />
      <rect x="62" y="118" width="80" height="8" rx="3" fill="#0891B2" opacity="0.1" />
      <circle cx="230" cy="75" r="22" fill="#F59E0B" opacity="0.2" stroke="#F59E0B" strokeWidth="2" />
      <text x="230" y="80" textAnchor="middle" fontSize="16" fill="#D97706" fontWeight="bold">€</text>
      <circle cx="255" cy="110" r="16" fill="#F59E0B" opacity="0.15" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="255" y="115" textAnchor="middle" fontSize="12" fill="#D97706" fontWeight="bold">€</text>
      <circle cx="210" cy="130" r="12" fill="#F59E0B" opacity="0.12" stroke="#F59E0B" strokeWidth="1" />
      <path d="M185 100 Q200 85 215 95" stroke="#0891B2" strokeWidth="2" fill="none" strokeDasharray="4 3" />
      <polygon points="215,90 223,95 215,100" fill="#0891B2" />
    </svg>
  );
}

export const stepIllustrations = [StepKycIllustration, StepPortfolioIllustration, StepInterestIllustration];

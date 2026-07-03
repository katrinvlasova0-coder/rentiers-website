import { assetPath } from '@/lib/basePath';

type Props = { className?: string };

const stepScreenshots = [
  {
    src: '/images/how-it-works/step-01-registration.jpg',
    alt: 'Rentiers registration — create your account',
  },
  {
    src: '/images/how-it-works/step-02-portfolio.jpg',
    alt: 'Rentiers investment products — choose your portfolio',
  },
  {
    src: '/images/how-it-works/step-03-balanced.jpg',
    alt: 'Rentiers Balanced — configure your deposit',
  },
] as const;

function StepScreenshot({ index, className = '' }: Props & { index: number }) {
  const { src, alt } = stepScreenshots[index];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={assetPath(src)}
      alt={alt}
      className={`w-full h-full object-cover object-top ${className}`.trim()}
      loading="lazy"
      decoding="async"
    />
  );
}

export function StepKycIllustration({ className = '' }: Props) {
  return <StepScreenshot index={0} className={className} />;
}

export function StepPortfolioIllustration({ className = '' }: Props) {
  return <StepScreenshot index={1} className={className} />;
}

export function StepInterestIllustration({ className = '' }: Props) {
  return <StepScreenshot index={2} className={className} />;
}

export const stepIllustrations = [
  StepKycIllustration,
  StepPortfolioIllustration,
  StepInterestIllustration,
];

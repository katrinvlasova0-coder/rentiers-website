import { ACCOUNT_THEME } from './accountTheme';

type AccountStepIndex = 1 | 2 | 3 | 4;

export interface StepProgressProps {
  current: AccountStepIndex;
}

const STEPS: AccountStepIndex[] = [1, 2, 3, 4];

export function StepProgress({ current }: StepProgressProps) {
  return (
    <ol
      className="flex w-full max-w-xs items-center"
      aria-label={`Account setup, step ${current} of 4`}
    >
      {STEPS.map((step) => {
        const reached = step <= current;

        return (
          <li key={step} className="flex flex-1 items-center last:flex-none">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
              style={{
                backgroundColor: reached ? ACCOUNT_THEME.primary : ACCOUNT_THEME.card,
                color: reached ? ACCOUNT_THEME.background : '#94a3b8',
                border: `1px solid ${reached ? ACCOUNT_THEME.primary : '#334155'}`,
              }}
              aria-current={step === current ? 'step' : undefined}
            >
              {step}
            </span>
            {step < 4 && (
              <span
                className="h-px flex-1"
                style={{
                  backgroundColor: step < current ? ACCOUNT_THEME.primary : '#334155',
                }}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default StepProgress;

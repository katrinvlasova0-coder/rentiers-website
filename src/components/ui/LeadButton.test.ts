import { describe, expect, it } from 'vitest';
import { getLeadButtonAction } from './LeadButton';

describe('getLeadButtonAction', () => {
  it('routes registration CTAs to account registration', () => {
    expect(getLeadButtonAction('register')).toEqual({
      type: 'route',
      href: '/account/register',
    });
  });

  it.each(['contact', 'b2b', 'login'] as const)(
    'keeps %s CTAs on the lead form modal',
    (source) => {
      expect(getLeadButtonAction(source)).toEqual({
        type: 'modal',
        source,
      });
    },
  );
});

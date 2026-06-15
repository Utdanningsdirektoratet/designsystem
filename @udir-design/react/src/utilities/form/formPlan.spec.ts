import { describe, expect, it } from 'vitest';
import { defineFormPlan } from './formPlan';

describe('defineFormPlan', () => {
  it('throws when the same step id is defined twice', () => {
    expect(() =>
      defineFormPlan([
        {
          id: 'step1',
          title: 'Step 1',
          fields: [{ name: 'question1', label: 'Question 1' }],
        },
        {
          id: 'step1',
          title: 'Step 1 duplicate',
          fields: [{ name: 'question2', label: 'Question 2' }],
        },
      ]),
    ).toThrow(/Duplicate step id "step1"/);
  });

  it('throws when the same step id is reused across sections', () => {
    expect(() =>
      defineFormPlan([
        {
          sectionTitle: 'Section 1',
          steps: [
            {
              id: 'step1',
              title: 'Step 1',
              fields: [{ name: 'question1', label: 'Question 1' }],
            },
          ],
        },
        {
          sectionTitle: 'Section 2',
          steps: [
            {
              id: 'step1',
              title: 'Step 1 again',
              fields: [{ name: 'question2', label: 'Question 2' }],
            },
          ],
        },
      ]),
    ).toThrow(/Duplicate step id "step1"/);
  });
});

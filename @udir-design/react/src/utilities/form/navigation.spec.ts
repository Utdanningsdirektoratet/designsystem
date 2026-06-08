import { describe, expect, it } from 'vitest';
import {
  defineSteps,
  getFieldIds,
  getStepIds,
  makeStepFinder,
} from './navigation';

const stepsDefinition = defineSteps({
  firstStep: ['question1', 'question2'],
  secondStep: ['question3'],
  thirdStep: ['question4', 'question5', 'question6'],
});

describe('defineSteps', () => {
  it('returns the same object passed in', () => {
    const input = { firstStep: ['question1'], secondStep: ['question2'] };
    expect(defineSteps(input)).toBe(input);
  });

  it('preserves the step and field order', () => {
    expect(stepsDefinition).toEqual({
      firstStep: ['question1', 'question2'],
      secondStep: ['question3'],
      thirdStep: ['question4', 'question5', 'question6'],
    });
  });
});

describe('getStepIds', () => {
  it('returns all step ids', () => {
    expect(getStepIds(stepsDefinition)).toEqual([
      'firstStep',
      'secondStep',
      'thirdStep',
    ]);
  });

  it('returns step ids in definition order', () => {
    const steps = defineSteps({
      step3: ['question3'],
      step1: ['question1'],
      step2: ['question2'],
    });
    expect(getStepIds(steps)).toEqual(['step3', 'step1', 'step2']);
  });

  it('returns empty array for empty definition', () => {
    expect(getStepIds({})).toEqual([]);
  });
});

describe('getFieldIds', () => {
  it('returns all field ids flattened', () => {
    expect(getFieldIds(stepsDefinition)).toEqual([
      'question1',
      'question2',
      'question3',
      'question4',
      'question5',
      'question6',
    ]);
  });

  it('returns fields in step order', () => {
    const steps = defineSteps({
      firstStep: ['question2', 'question1'],
      secondStep: ['question3'],
    });
    expect(getFieldIds(steps)).toEqual(['question2', 'question1', 'question3']);
  });

  it('returns empty array for empty definition', () => {
    expect(getFieldIds({})).toEqual([]);
  });

  it('ignores empty step arrays and returns fields from non-empty steps', () => {
    const steps = defineSteps({
      firstStep: [],
      secondStep: ['question3'],
      thirdStep: [],
    });
    expect(getFieldIds(steps)).toEqual(['question3']);
  });
});

describe('makeStepFinder', () => {
  const findStepForField = makeStepFinder(stepsDefinition);

  it('finds the correct step for a field in the first step', () => {
    expect(findStepForField('question1')).toBe('firstStep');
    expect(findStepForField('question2')).toBe('firstStep');
  });

  it('finds the correct step for a field in the second step', () => {
    expect(findStepForField('question3')).toBe('secondStep');
  });

  it('finds the correct step for a field in the third step', () => {
    expect(findStepForField('question6')).toBe('thirdStep');
  });

  it('returns undefined for a question that does not exist in any step', () => {
    expect(findStepForField('question7')).toBeUndefined();
  });

  it('returns the first matching step when a field exists in multiple steps', () => {
    const duplicateSteps = defineSteps({
      firstStep: ['sharedQuestion', 'question1'],
      secondStep: ['sharedQuestion', 'question2'],
    });
    const duplicateFinder = makeStepFinder(duplicateSteps);

    expect(duplicateFinder('sharedQuestion')).toBe('firstStep');
  });

  it('returns undefined for any field when step definition is empty', () => {
    const emptyFinder = makeStepFinder({});
    expect(emptyFinder('question1')).toBeUndefined();
  });
});

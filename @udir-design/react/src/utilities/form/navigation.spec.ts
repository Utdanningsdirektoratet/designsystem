import { describe, expect, expectTypeOf, it } from 'vitest';
import {
  defineSteps,
  getFieldIds,
  getStepIds,
  makeStepFinder,
} from './navigation';
import type { GetFieldId, GetStepId } from './navigation';

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

  it('preserves literal step and field ids for type inference', () => {
    type StepId = GetStepId<typeof stepsDefinition>;
    type FieldId = GetFieldId<typeof stepsDefinition>;

    expectTypeOf<StepId>().toEqualTypeOf<
      'firstStep' | 'secondStep' | 'thirdStep'
    >();
    expectTypeOf<FieldId>().toEqualTypeOf<
      | 'question1'
      | 'question2'
      | 'question3'
      | 'question4'
      | 'question5'
      | 'question6'
    >();
  });

  it('throws when a field id is defined in multiple steps', () => {
    expect(() =>
      defineSteps({
        firstStep: ['sharedQuestion', 'question1'],
        secondStep: ['sharedQuestion', 'question2'],
      }),
    ).toThrow(/Duplicate field id "sharedQuestion"/);
  });

  it('throws when a field id is repeated within the same step', () => {
    expect(() =>
      defineSteps({
        firstStep: ['question1', 'question1'],
      }),
    ).toThrow(/Duplicate field id "question1"/);
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

  it('returns a properly typed step id array', () => {
    const stepIds = getStepIds(stepsDefinition);

    expectTypeOf(stepIds).toEqualTypeOf<
      Array<'firstStep' | 'secondStep' | 'thirdStep'>
    >();
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

  it('returns a properly typed field id array', () => {
    const fieldIds = getFieldIds(stepsDefinition);

    expectTypeOf(fieldIds).toEqualTypeOf<
      Array<
        | 'question1'
        | 'question2'
        | 'question3'
        | 'question4'
        | 'question5'
        | 'question6'
      >
    >();
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

  it('returns a properly typed lookup function', () => {
    expectTypeOf(findStepForField).toEqualTypeOf<
      (
        field:
          | 'question1'
          | 'question2'
          | 'question3'
          | 'question4'
          | 'question5'
          | 'question6'
          | (string & {}),
      ) => 'firstStep' | 'secondStep' | 'thirdStep' | undefined
    >();
  });

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

  it('returns undefined for any field when step definition is empty', () => {
    const emptyFinder = makeStepFinder({});
    expect(emptyFinder('question1')).toBeUndefined();
  });

  it('skips empty steps when looking up a field in a later step', () => {
    const sparseSteps = defineSteps({
      firstStep: [],
      secondStep: ['question2'],
      thirdStep: [],
    });
    const sparseFinder = makeStepFinder(sparseSteps);

    expect(sparseFinder('question2')).toBe('secondStep');
    expect(sparseFinder('question1')).toBeUndefined();
  });
});

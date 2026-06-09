import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useFormNavigation } from './useFormNavigation';

const order = ['step1', 'step2', 'step3'] as const;

describe('initial state', () => {
  it('returns no active step id when no value or order is given', () => {
    const { result } = renderHook(() => useFormNavigation());
    expect(result.current.id).toBeNull();
  });

  it('uses value as initial active step id', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ value: 'step2', order: [...order] }),
    );
    expect(result.current.id).toBe('step2');
  });

  it('returns the first step when no value is given', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    expect(result.current.id).toBe('step1');
  });
});

describe('value not in order', () => {
  it('warns when value is not in order', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    renderHook(() =>
      useFormNavigation({ value: 'unknown', order: [...order] }),
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('"unknown" is not included in order'),
    );
    warnSpy.mockRestore();
  });

  it('navigation is stuck when value is not in order', async () => {
    // Suppress expected warning from test output
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { result } = renderHook(() =>
      useFormNavigation({ value: 'unknown', order: [...order] }),
    );
    expect(result.current.id).toBe('unknown');
    expect(result.current.hasNext()).toBe(false);
    expect(result.current.hasPrev()).toBe(false);

    const movedNext = await act(async () => result.current.next());
    expect(movedNext).toBe(false);

    const movedPrev = await act(async () => result.current.prev());
    expect(movedPrev).toBe(false);
    vi.restoreAllMocks();
  });

  it('can recover from unknown value via setId', () => {
    // Suppress expected warning from test output
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { result } = renderHook(() =>
      useFormNavigation({ value: 'unknown', order: [...order] }),
    );
    act(() => result.current.setId('step2'));
    expect(result.current.id).toBe('step2');
    expect(result.current.hasNext()).toBe(true);
    expect(result.current.hasPrev()).toBe(true);
    vi.restoreAllMocks();
  });
});

describe('setId', () => {
  it('updates the active step id', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    act(() => result.current.setId('step2'));
    expect(result.current.id).toBe('step2');
  });

  it('calls onChange with arguments next and prev', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order], onChange }),
    );
    act(() => result.current.setId('step2'));
    expect(onChange).toHaveBeenCalledWith('step2', 'step1');
  });

  it('accepts an function as next', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    act(() => result.current.setId(() => 'step3'));
    expect(result.current.id).toBe('step3');
  });

  it('does not call onChange when step id is set to the same value', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order], onChange }),
    );
    act(() => result.current.setId('step1'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('next, prev', () => {
  it('next moves to the next step and returns true', async () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    const moved = await act(async () => result.current.next());
    expect(moved).toBe(true);
    expect(result.current.id).toBe('step2');
  });

  it('next moves to first step when active step id is null and steps are available', async () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    act(() => result.current.setId(null));
    expect(result.current.id).toBeNull();
    const moved = await act(async () => result.current.next());
    expect(moved).toBe(true);
    expect(result.current.id).toBe('step1');
  });

  it('next returns false when active step id is null and no steps available', async () => {
    const { result } = renderHook(() => useFormNavigation({ order: [] }));
    const moved = await act(async () => result.current.next());
    expect(moved).toBe(false);
    expect(result.current.id).toBeNull();
  });

  it('next calls onChange with next and prev step id', async () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order], onChange }),
    );
    await act(async () => result.current.next());
    expect(onChange).toHaveBeenCalledWith('step2', 'step1');
  });

  it('next calls onChange with null as prev when active step id is null', async () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order], onChange }),
    );
    act(() => result.current.setId(null));
    onChange.mockClear();
    await act(async () => result.current.next());
    expect(onChange).toHaveBeenCalledWith('step1', null);
  });

  it('next returns false when called on the last step', async () => {
    const { result } = renderHook(() =>
      useFormNavigation({ value: 'step3', order: [...order] }),
    );
    const moved = await act(async () => result.current.next());
    expect(moved).toBe(false);
    expect(result.current.id).toBe('step3');
  });

  it('prev moves to the previous step and returns true', async () => {
    const { result } = renderHook(() =>
      useFormNavigation({ value: 'step2', order: [...order] }),
    );
    const moved = await act(async () => result.current.prev());
    expect(moved).toBe(true);
    expect(result.current.id).toBe('step1');
  });

  it('prev calls onChange with next and prev step id', async () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useFormNavigation({ value: 'step2', order: [...order], onChange }),
    );
    await act(async () => result.current.prev());
    expect(onChange).toHaveBeenCalledWith('step1', 'step2');
  });

  it('prev returns false when active step id is null', async () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    act(() => result.current.setId(null));
    expect(result.current.id).toBeNull();
    const moved = await act(async () => result.current.prev());
    expect(moved).toBe(false);
    expect(result.current.id).toBeNull();
  });

  it('prev returns false when called on the first step', async () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    const moved = await act(async () => result.current.prev());
    expect(moved).toBe(false);
    expect(result.current.id).toBe('step1');
  });

  it('navigates through all steps and stops at boundaries', async () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    expect(result.current.id).toBe('step1');

    await act(async () => result.current.next());
    expect(result.current.id).toBe('step2');

    await act(async () => result.current.next());
    expect(result.current.id).toBe('step3');

    const blocked = await act(async () => result.current.next());
    expect(blocked).toBe(false);
    expect(result.current.id).toBe('step3');

    await act(async () => result.current.prev());
    expect(result.current.id).toBe('step2');

    await act(async () => result.current.prev());
    expect(result.current.id).toBe('step1');

    const blockedBack = await act(async () => result.current.prev());
    expect(blockedBack).toBe(false);
    expect(result.current.id).toBe('step1');
  });
});

describe('navigation using implicit render order', () => {
  it('next and prev use order derived from getStepProps calls', async () => {
    type StepId = 'charlie' | 'alpha' | 'bravo';
    const { result } = renderHook(() =>
      useFormNavigation<StepId>({ value: 'charlie' }),
    );
    // Register steps in non-alphabetical order
    result.current.getStepProps('charlie');
    result.current.getStepProps('alpha');
    result.current.getStepProps('bravo');

    const moved = await act(async () => result.current.next());
    expect(moved).toBe(true);
    expect(result.current.id).toBe('alpha');

    const movedBack = await act(async () => result.current.prev());
    expect(movedBack).toBe(true);
    expect(result.current.id).toBe('charlie');
  });

  it('hasNext and hasPrev use order derived from getStepProps calls', () => {
    type StepId = 'charlie' | 'alpha' | 'bravo';
    const { result } = renderHook(() =>
      useFormNavigation<StepId>({ value: 'alpha' }),
    );
    result.current.getStepProps('charlie');
    result.current.getStepProps('alpha');
    result.current.getStepProps('bravo');

    expect(result.current.hasPrev()).toBe(true);
    expect(result.current.hasNext()).toBe(true);
  });
});

describe('hasNext, hasPrev', () => {
  it('hasNext is true when not on last step', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    expect(result.current.hasNext()).toBe(true);
  });

  it('hasNext is false on last step', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ value: 'step3', order: [...order] }),
    );
    expect(result.current.hasNext()).toBe(false);
  });

  it('hasPrev is false on first step', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    expect(result.current.hasPrev()).toBe(false);
  });

  it('hasPrev is true when not on first step', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ value: 'step2', order: [...order] }),
    );
    expect(result.current.hasPrev()).toBe(true);
  });

  it('hasPrev is false when activeId is null', () => {
    const { result } = renderHook(() => useFormNavigation());
    expect(result.current.hasPrev()).toBe(false);
  });

  it('hasNext is true when activeId is null and steps are available', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    act(() => result.current.setId(null));
    expect(result.current.hasNext()).toBe(true);
  });
});

describe('markCompleted, markInvalid, resetStep, reset', () => {
  it('markCompleted sets step state to completed', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    act(() => result.current.markCompleted('step2'));
    expect(result.current.getStepProps('step2').state).toBe('completed');
  });

  it('markInvalid sets step state to invalid', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    act(() => result.current.markInvalid('step2'));
    expect(result.current.getStepProps('step2').state).toBe('invalid');
  });

  it('resetStep sets step state to idle', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    act(() => result.current.markCompleted('step2'));
    expect(result.current.getStepProps('step2').state).toBe('completed');
    act(() => result.current.resetStep('step2'));
    expect(result.current.getStepProps('step2').state).toBe('idle');
  });

  it('reset sets all states to idle', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    act(() => {
      result.current.markCompleted('step2');
      result.current.markInvalid('step3');
    });
    act(() => result.current.reset());
    expect(result.current.getStepProps('step2').state).toBe('idle');
    expect(result.current.getStepProps('step3').state).toBe('idle');
  });
});

describe('getStepProps', () => {
  it('active step has state "active"', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    expect(result.current.getStepProps('step1').state).toBe('active');
  });

  it('inactive step defaults to state "idle"', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    expect(result.current.getStepProps('step2').state).toBe('idle');
  });

  it('throws error if no step id is provided', () => {
    const { result } = renderHook(() => useFormNavigation());
    expect(() => result.current.getStepProps({})).toThrow();
  });

  it('state override takes precedence', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    expect(
      result.current.getStepProps({ stepId: 'step1', state: 'completed' })
        .state,
    ).toBe('completed');
  });

  it('passes through extra HTML attributes', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    const props = result.current.getStepProps({
      stepId: 'step1',
      'aria-label': 'First step',
      className: 'custom',
    });
    expect(props['aria-label']).toBe('First step');
    expect(props.className).toBe('custom');
  });

  it('onClick handler calls provided onClick callback', () => {
    const onClickCallback = vi.fn();
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    const props = result.current.getStepProps({
      stepId: 'step2',
      onClick: onClickCallback,
    });

    const mockEvent = {
      defaultPrevented: false,
    } as React.MouseEvent<HTMLButtonElement>;
    act(() => {
      props.onClick?.(mockEvent);
    });

    expect(onClickCallback).toHaveBeenCalledWith(mockEvent);
    expect(result.current.id).toBe('step2');
  });

  it('onClick handler respects defaultPrevented', () => {
    const onClickCallback = vi.fn();
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    const props = result.current.getStepProps({
      stepId: 'step2',
      onClick: onClickCallback,
    });

    const mockEvent = {
      defaultPrevented: true,
    } as React.MouseEvent<HTMLButtonElement>;
    act(() => {
      props.onClick?.(mockEvent);
    });

    expect(onClickCallback).toHaveBeenCalledWith(mockEvent);
    // Should not change active id due to defaultPrevented
    expect(result.current.id).toBe('step1');
  });
});

describe('getGroupProps', () => {
  it('returns idle when no steps have a state', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    expect(result.current.getGroupProps(['step1', 'step2']).state).toBe('idle');
  });

  it('returns idle for empty group', () => {
    const { result } = renderHook(() => useFormNavigation());
    expect(result.current.getGroupProps([]).state).toBe('idle');
  });

  it('returns completed when all steps are completed', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    act(() => {
      result.current.markCompleted('step1');
      result.current.markCompleted('step2');
    });
    expect(result.current.getGroupProps(['step1', 'step2']).state).toBe(
      'completed',
    );
  });

  it('returns completed only when all steps are completed', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ value: 'step3', order: [...order] }),
    );
    act(() => {
      result.current.markCompleted('step1');
      result.current.markCompleted('step2');
      result.current.markCompleted('step3');
    });
    expect(
      result.current.getGroupProps(['step1', 'step2', 'step3']).state,
    ).toBe('completed');
    // Test that partial completion doesn't return 'completed'
    const { result: result2 } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    act(() => {
      result2.current.markCompleted('step1');
      result2.current.markCompleted('step2');
      // step3 is not marked as completed
    });
    expect(
      result2.current.getGroupProps(['step1', 'step2', 'step3']).state,
    ).toBe('idle');
  });

  it('returns invalid when any step is invalid', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    act(() => {
      result.current.markCompleted('step1');
      result.current.markInvalid('step2');
    });
    expect(result.current.getGroupProps(['step1', 'step2']).state).toBe(
      'invalid',
    );
  });

  it('returns idle when group includes the active step without explicit state', () => {
    const { result } = renderHook(() =>
      useFormNavigation({ order: [...order] }),
    );
    // step1 is active, step2 is completed — group is not fully completed
    act(() => result.current.markCompleted('step2'));
    expect(result.current.getGroupProps(['step1', 'step2']).state).toBe('idle');
  });
});

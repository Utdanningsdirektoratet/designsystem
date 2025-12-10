import type {
  Dispatch,
  ForwardedRef,
  HTMLAttributes,
  MouseEventHandler,
  SetStateAction,
} from 'react';
import { useCallback, useRef, useState } from 'react';

export type FormNavigationState = 'idle' | 'active' | 'completed' | 'invalid';

export type UseFormNavigationProps<TId extends string = string> = {
  /**
   * Initial active step ID
   */
  value?: TId | null;
  /**
   * Called when the active step changes
   */
  onChange?: (nextId: TId, prevId: TId | null) => void;
  /**
   * Define the order of the steps. If not provided, the order
   * will be determined by the order of `getStepProps` calls.
   */
  order?: TId[];
};

export type GetFormNavigationStepProps<TId extends string = string> = Omit<
  HTMLAttributes<HTMLButtonElement>,
  'aria-current'
> & {
  ref?: ForwardedRef<HTMLButtonElement>;
  /**
   * Step ID for this step. Alternatively, you can send id
   * directly to `getStepProps(stepId)`.
   */
  stepId?: TId;
  /**
   * Override state manually (usually not necessary).
   */
  state?: FormNavigationState;
  /**
   * Label for the step.
   */
  label?: string;
};

type UseFormNavigationReturn<TId extends string = string> = {
  /**
   * Active step ID
   */
  id: TId | null;
  /**
   * Set active step ID
   */
  setId: Dispatch<SetStateAction<TId | null>>;
  /**
   * Mark step as completed
   */
  markCompleted: (id: TId) => void;
  /**
   * Mark step as invalid
   */
  markInvalid: (id: TId) => void;
  /**
   * Reset step to idle
   */
  resetStep: (id: TId) => void;
  /**
   * Reset all steps to idle
   */
  reset: () => void;
  /**
   * Go to previous step
   */
  prev: () => boolean;
  /**
   * Go to next step
   */
  next: () => boolean;
  /**
   * Whether a previous step is available
   */
  hasPrev: () => boolean;
  /**
   * Whether a next step is available
   */
  hasNext: () => boolean;
  /**
   * Give props to `FormNavigationStep`.
   * @example
   * <FormNavigationStep {...getStepProps(0)}>Første</FormNavigationStep>
   */
  getStepProps: (
    propsOrId: TId | GetFormNavigationStepProps<TId>,
  ) => GetFormNavigationStepProps<TId> & { state: FormNavigationState };
  /**
   * Give props to `FormNavigationGroup`.
   * @example
   * <FormNavigationGroup {...getGroupProps(["step-1", "step-2"])}>Gruppe</FormNavigationGroup>
   */
  getGroupProps: (ids: TId[]) => {
    state: Exclude<FormNavigationState, 'active'>;
  };
};

// Overloads for generic type inference
export function useFormNavigation(
  props?: UseFormNavigationProps<string>,
): UseFormNavigationReturn<string>;

export function useFormNavigation<TId extends string>(
  props: UseFormNavigationProps<TId>,
): UseFormNavigationReturn<TId>;

/**
 * useFormNavigation – lightweight management for FormNavigation + FormNavigationStep
 */
export function useFormNavigation<TId extends string = string>({
  value: initialId = null,
  onChange,
  order,
}: UseFormNavigationProps<TId> = {}): UseFormNavigationReturn<TId> {
  const [activeId, setActiveId] = useState<TId | null>(
    initialId ?? (order?.[0] as TId | undefined) ?? null,
  );
  const [stepStates, setStepStates] = useState<
    Record<TId, Exclude<FormNavigationState, 'active'>>
  >({} as Record<TId, Exclude<FormNavigationState, 'active'>>);

  const renderOrderRef = useRef<TId[]>([]);

  const setId: UseFormNavigationReturn<TId>['setId'] = (next) => {
    setActiveId((prev) => {
      const nextValue = typeof next === 'function' ? next(prev) : next;
      if (nextValue !== prev) onChange?.(nextValue as TId, prev);
      return nextValue;
    });
  };

  const setStepState = (
    id: TId,
    state: Exclude<FormNavigationState, 'active'>,
  ) => setStepStates((prev) => ({ ...prev, [id]: state }));

  const markCompleted = (id: TId) => setStepState(id, 'completed');
  const markInvalid = (id: TId) => setStepState(id, 'invalid');
  const resetStep = (id: TId) => setStepState(id, 'idle');
  const reset = () =>
    setStepStates({} as Record<TId, Exclude<FormNavigationState, 'active'>>);

  const getStepProps: UseFormNavigationReturn<TId>['getStepProps'] = (
    propsOrId,
  ) => {
    const props =
      typeof propsOrId === 'string'
        ? ({ stepId: propsOrId } as GetFormNavigationStepProps<TId>)
        : propsOrId;

    const {
      ref,
      stepId,
      state: stateOverride,
      onClick,
      children,
      label,
      ...rest
    } = props;

    if (!stepId) {
      throw new Error('getStepProps krever en stepId');
    }

    if (!renderOrderRef.current.includes(stepId)) {
      renderOrderRef.current.push(stepId);
    }

    const derivedState: FormNavigationState =
      stepId === activeId ? 'active' : (stepStates[stepId] ?? 'idle');
    const state = stateOverride ?? derivedState;

    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      setId(stepId);
    };

    return {
      ...rest,
      ref,
      onClick: handleClick,
      state,
      children: children ?? label,
    };
  };

  const deriveNavigationState = useCallback(
    (indices: TId[]) => {
      if (indices.length === 0) return 'idle';
      if (indices.some((id) => stepStates[id] === 'invalid')) return 'invalid';
      if (indices.every((id) => stepStates[id] === 'completed'))
        return 'completed';
      return 'idle';
    },
    [stepStates],
  );

  const getGroupProps: UseFormNavigationReturn<TId>['getGroupProps'] = (
    ids,
  ) => {
    const state = deriveNavigationState(ids);
    return {
      state,
    };
  };

  const effectiveOrder = (
    order && order.length > 0 ? order : renderOrderRef.current
  ) as TId[];

  const prev = () => {
    if (!activeId) return false;
    const i = effectiveOrder.indexOf(activeId as TId);
    if (i <= 0) return false;
    setId(effectiveOrder[i - 1]);
    return true;
  };

  const next = () => {
    if (!activeId) {
      if (effectiveOrder.length > 0) {
        setId(effectiveOrder[0]);
        return true;
      }
      return false;
    }
    const i = effectiveOrder.indexOf(activeId as TId);
    if (i === -1 || i >= effectiveOrder.length - 1) return false;
    setId(effectiveOrder[i + 1]);
    return true;
  };

  const hasPrev = () => {
    if (!activeId) return false;
    const index = effectiveOrder.indexOf(activeId as TId);
    return index > 0;
  };

  const hasNext = () => {
    if (!activeId) return effectiveOrder.length > 0;
    const index = effectiveOrder.indexOf(activeId as TId);
    return index > -1 && index < effectiveOrder.length - 1;
  };

  return {
    id: activeId,
    setId,
    markCompleted,
    markInvalid,
    resetStep,
    reset,
    next,
    prev,
    hasNext,
    hasPrev,
    getStepProps,
    getGroupProps,
  };
}

import { useState } from 'react';

export type FormNavigationState = 'idle' | 'active' | 'completed' | 'invalid';

export type UseFormNavigationProps = {
  /**
   * Initial active step (0-based)
   */
  value?: number;
  /**
   * Called when the active step changes
   */
  onChange?: (nextIndex: number, prevIndex: number) => void;
  /**
   * Disables all items
   */
  disabled?: boolean;
};

export type GetFormNavigationItemProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-current'
> & {
  ref?: React.ForwardedRef<HTMLButtonElement>;
  /**
   * Index for this item (0-based). Alternatively, you can send `number`
   * directly to `getItemProps(index)`.
   */
  index?: number;
  /**
   * Override state manually (usually not necessary).
   */
  state?: FormNavigationState;
};

type UseFormNavigationReturn = {
  /**
   * Active indeks
   */
  index: number;
  /**
   * Set active indeks
   */
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  /**
   * Mark step as completed
   */
  markCompleted: (i: number) => void;
  /**
   * Mark step as invalid
   */
  markInvalid: (i: number) => void;
  /**
   * Reset step to idle
   */
  resetItem: (i: number) => void;
  /**
   * Reset all steps to idle
   */
  reset: () => void;
  /**
   * Give props to `FormNavigationItem`.
   * @example
   * <FormNavigationItem {...getItemProps(0)}>Første</FormNavigationItem>
   */
  getItemProps: (
    propsOrIndex: number | GetFormNavigationItemProps,
  ) => GetFormNavigationItemProps & { state: FormNavigationState };
};

/**
 * useFormNavigation – lightweight management for FormNavigation + FormNavigationItem
 */
export function useFormNavigation({
  value: initialIndex = 0,
  onChange,
  disabled,
}: UseFormNavigationProps = {}): UseFormNavigationReturn {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [itemStates, setItemStates] = useState<
    Record<number, Exclude<FormNavigationState, 'active'>>
  >({});

  const setIndex: UseFormNavigationReturn['setIndex'] = (next) => {
    setActiveIndex((prev) => {
      const nextValue = typeof next === 'function' ? next(prev) : next;
      if (nextValue !== prev) onChange?.(nextValue, prev);
      return nextValue;
    });
  };

  const setItemState = (
    i: number,
    state: Exclude<FormNavigationState, 'active'>,
  ) =>
    setItemStates((prev) => {
      const next = { ...prev };
      next[i] = state;
      return next;
    });

  const markCompleted = (i: number) => setItemState(i, 'completed');
  const markInvalid = (i: number) => setItemState(i, 'invalid');
  const resetItem = (i: number) => setItemState(i, 'idle');
  const reset = () => setItemStates({});

  const getItemProps: UseFormNavigationReturn['getItemProps'] = (
    propsOrIndex,
  ) => {
    const props =
      typeof propsOrIndex === 'number'
        ? ({ index: propsOrIndex } as GetFormNavigationItemProps)
        : propsOrIndex;

    const {
      ref: forwardedRef = undefined,
      index = 0,
      state: stateOverride,
      onClick,
      ...rest
    } = props;

    const derivedState: FormNavigationState =
      index === activeIndex ? 'active' : (itemStates[index] ?? 'idle');
    const state = stateOverride ?? derivedState;

    const handleRef = (el: HTMLButtonElement | null) => {
      if (!forwardedRef) return;
      if (typeof forwardedRef === 'function') forwardedRef(el);
      else (forwardedRef as any).current = el;
    };

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      setIndex(index);
    };

    return {
      ...rest,
      ref: handleRef,
      disabled: disabled || rest.disabled,
      'aria-current': index === activeIndex ? 'step' : undefined,
      'aria-invalid': state === 'invalid' || rest['aria-invalid'],
      onClick: handleClick,
      state,
    };
  };

  return {
    index: activeIndex,
    setIndex,
    markCompleted,
    markInvalid,
    resetItem,
    reset,
    getItemProps,
  };
}

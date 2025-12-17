import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { FormNavigationState } from './FormNavigation';
import '@u-elements/u-details';
import { STEP_STATE_ATTRIBUTE } from './FormNavigationStep';

export type FormNavigationGroupProps = HTMLAttributes<HTMLDetailsElement> & {
  /**
   * The title to be displayed in the FormNavigation.Group component.
   */
  title: string;
  /**
   * The current state of the FormNavigation.Group component.
   */
  state?: Exclude<FormNavigationState, 'active'>;
  /**
   * Whether the FormNavigation.Group is open or closed
   */
  open?: boolean;
};

const ACTIVE_STEP_ATTRIBUTE = 'data-active-step-label';

export const FormNavigationGroup = forwardRef<
  HTMLDetailsElement,
  FormNavigationGroupProps
>(function FormNavigationGroup(
  { title, state = 'idle', children, className, open = true, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLDetailsElement>(null);
  // Ensure we can use a ref internally and also expose it to consumers
  useImperativeHandle(ref, () => innerRef.current as HTMLDetailsElement);

  const setActiveStepLabel = (label?: string | null) => {
    if (label) {
      innerRef.current?.setAttribute(ACTIVE_STEP_ATTRIBUTE, label);
    }
  };

  useEffect(() => {
    // Automatically set the current active step as data-active-step-label
    if (innerRef.current) {
      // Handle initial value
      const initialActiveStep = innerRef?.current?.querySelector(
        `[${STEP_STATE_ATTRIBUTE}="active"]`,
      )?.lastChild?.nodeValue;
      setActiveStepLabel(initialActiveStep);

      // Handle state changes using a MutationObserver
      const observer = new MutationObserver((mutations) => {
        const newActiveStep = getActiveStepFromMutations(mutations);
        setActiveStepLabel(newActiveStep);
      });

      observer.observe(innerRef.current, {
        attributeFilter: [STEP_STATE_ATTRIBUTE],
        attributes: true,
        childList: true,
        subtree: true,
      });

      // Cleanup
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <u-details
      data-state={state}
      class={cl('uds-form-navigation__group', className)}
      ref={innerRef}
      open={open}
      {...rest}
    >
      <u-summary aria-invalid={state === 'invalid' || undefined}>
        <span>{title}</span>
      </u-summary>
      {children}
    </u-details>
  );
});

function getActiveStepFromMutations(mutations: MutationRecord[]) {
  return mutations.find(
    (x) =>
      x.attributeName === STEP_STATE_ATTRIBUTE &&
      x.target instanceof Element &&
      x.target.getAttribute(STEP_STATE_ATTRIBUTE) === 'active',
  )?.target.lastChild?.nodeValue;
}

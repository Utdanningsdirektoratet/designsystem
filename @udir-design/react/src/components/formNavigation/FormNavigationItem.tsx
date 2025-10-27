import { HTMLAttributes, forwardRef } from 'react';
import {
  CheckmarkCircleIcon,
  CircleFillIcon,
  CircleIcon,
  XMarkOctagonIcon,
} from '@udir-design/icons/dist';

export type FormNavigationState = 'idle' | 'active' | 'completed' | 'invalid';

export type FormNavigationItemProps = HTMLAttributes<HTMLButtonElement> & {
  state?: FormNavigationState;
};

export const FormNavigationItem = forwardRef<
  HTMLButtonElement,
  FormNavigationItemProps
>(({ children, state = 'idle', ...rest }, ref) => {
  return (
    <button data-state={state} ref={ref} {...rest}>
      <div>
        <CircleIcon aria-hidden />
        <CircleFillIcon aria-hidden />
        <CheckmarkCircleIcon aria-hidden />
        <XMarkOctagonIcon aria-hidden />
      </div>
      {children}
    </button>
  );
});

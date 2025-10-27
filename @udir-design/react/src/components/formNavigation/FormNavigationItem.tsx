import { HTMLAttributes, forwardRef } from 'react';
import {
  CheckmarkIcon,
  CircleFillIcon,
  XMarkIcon,
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
        <CircleFillIcon aria-hidden />
        <CheckmarkIcon aria-hidden />
        <XMarkIcon aria-hidden />
      </div>
      {children}
    </button>
  );
});

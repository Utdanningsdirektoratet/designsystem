import cl from 'clsx/lite';
import { HTMLAttributes, forwardRef } from 'react';
import './formNavigation.css';
import { ChevronDownIcon, ChevronUpIcon } from '@udir-design/icons';

export type FormNavigationProps = HTMLAttributes<HTMLDetailsElement> & {
  /**
   * The title to be displayed in the FormNavigation component.
   */
  title: string;
  /**
   * The icon to be displayed alongside the title.
   */
  icon: React.ReactNode;
  /**
   * The current state of the FormNavigation component.
   */
  state: 'idle' | 'completed' | 'invalid';
  /**
   * Whether the FormNavigation is open or closed
   */
  open?: boolean;
};

export const FormNavigation = forwardRef<
  HTMLDetailsElement,
  FormNavigationProps
>(function FormNavigation(
  { title, icon, state = 'idle', children, className, ...rest },
  ref,
) {
  return (
    <u-details
      data-state={state}
      className={cl('uds-form-navigation', className)}
      ref={ref}
      {...rest}
    >
      <u-summary>
        <button>
          {icon}
          {title}
          <ChevronDownIcon aria-hidden />
          <ChevronUpIcon aria-hidden />
        </button>
      </u-summary>
      {children}
    </u-details>
  );
});

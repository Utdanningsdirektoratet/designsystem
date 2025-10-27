import cl from 'clsx/lite';
import { HTMLAttributes, forwardRef } from 'react';
import './formNavigation.css';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from '@udir-design/icons/dist';

export type FormNavigationProps = HTMLAttributes<HTMLDetailsElement> & {
  /**
   * The title to be displayed in the FormNavigation component.
   */
  title: string;
  /**
   * The icon to be displayed alongside the title.
   */
  icon: React.ReactNode;

  state: 'idle' | 'completed' | 'invalid';
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
          <div>
            {icon}
            <XMarkIcon aria-hidden />
          </div>
          {title}
          <ChevronDownIcon aria-hidden />
          <ChevronUpIcon aria-hidden />
        </button>
      </u-summary>
      {children}
    </u-details>
  );
});

import cl from 'clsx/lite';
import { HTMLAttributes, forwardRef } from 'react';
import './formNavigation.css';
import { XMarkIcon } from '@udir-design/icons/dist';

export type FormNavigationProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The title to be displayed in the FormNavigation component.
   */
  title: string;
  /**
   * The icon to be displayed alongside the title.
   */
  icon: React.ReactNode;

  state: 'idle' | 'completed' | 'invalid';
  isOpen?: boolean;
};

export const FormNavigation = forwardRef<HTMLDivElement, FormNavigationProps>(
  function FormNavigation(
    { title, icon, state = 'idle', children, className, ...rest },
    ref,
  ) {
    return (
      <div
        data-state={state}
        className={cl('uds-form-navigation', className)}
        ref={ref}
        {...rest}
      >
        <button>
          <div>
            {icon}
            <XMarkIcon aria-hidden />
          </div>
          {title}
        </button>
        {children}
      </div>
    );
  },
);

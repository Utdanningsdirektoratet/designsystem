import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@udir-design/icons';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';

export type HeaderUserButtonProps = HTMLAttributes<HTMLButtonElement> & {
  /**
   * The name of the logged in user.
   */
  name: string;
  /**
   * Description of the logged in user, e.g. user role.
   */
  description?: string;
  /**
   * The avatar of the logged in user. Use <Avatar /> component.
   */
  avatar?: React.ReactNode;
  /**
   * Change the color scheme of UserButton.
   * @default 'neutral'
   */
  'data-color'?: 'neutral' | 'accent';
};

export const HeaderUserButton = forwardRef<
  HTMLButtonElement,
  Omit<HeaderUserButtonProps, 'children'>
>(function HeaderUserButton(
  {
    name,
    description,
    className,
    avatar,
    'data-color': dataColor = 'neutral',
    ...rest
  },
  ref,
) {
  return (
    <button
      type="button"
      className={cl('uds-header__user-button', className)}
      data-color={dataColor}
      ref={ref}
      {...rest}
    >
      <div>
        <Heading data-size="2xs" level={3} title={name}>
          {name}
        </Heading>
        {description && <Paragraph data-size="xs">{description}</Paragraph>}
      </div>
      {avatar && avatar}
      <ChevronDownIcon aria-hidden />
      <ChevronUpIcon aria-hidden />
    </button>
  );
});

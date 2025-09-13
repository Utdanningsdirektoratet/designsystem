import { forwardRef, HTMLAttributes } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import cl from 'clsx/lite';
import { Heading, Paragraph } from '../typography';

export type HeaderUserButtonProps = HTMLAttributes<HTMLButtonElement> & {
  /**
   * The username of the logged in user.
   */
  username: string;
  /**
   * The role of the logged in user.
   */
  userRole?: string;
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
  HeaderUserButtonProps
>(function HeaderUserButton(
  {
    username,
    userRole,
    children,
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
        <Heading data-size="2xs" level={3}>
          {username}
        </Heading>
        {userRole && <Paragraph data-size="xs">{userRole}</Paragraph>}
      </div>
      {avatar && avatar}
      <ChevronDownIcon aria-hidden />
      <ChevronUpIcon aria-hidden />
    </button>
  );
});

import { Heading, Paragraph } from '@udir-design/react/alpha';
import { forwardRef, HTMLAttributes } from 'react';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import cl from 'clsx/lite';

export type HeaderUserButtonProps = HTMLAttributes<HTMLButtonElement> & {
  username: string;
  userRole?: string;
  avatar?: React.ReactNode;
};

export const HeaderUserButton = forwardRef<
  HTMLButtonElement,
  HeaderUserButtonProps
>(function HeaderUser(
  { username, userRole, children, className, avatar, ...rest },
  ref,
) {
  return (
    <button
      type="button"
      ref={ref}
      className={cl('ds-header__user-button', className)}
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
    </button>
  );
});

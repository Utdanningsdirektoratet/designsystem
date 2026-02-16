import cl from 'clsx/lite';
import { forwardRef } from 'react';
import { NotePencilIcon } from '@udir-design/icons';
import type { CardBlockProps } from '../card/Card';
import { Card } from '../card/Card';
import { Link } from '../link/Link';
import { Heading } from '../typography/heading/Heading';

export type FormSummarySectionProps = CardBlockProps & {
  /**
   * Title of the section.
   */
  title: string;
  /**
   * Heading level for the section title.
   * @default 3
   */
  level?: 3 | 4 | 5;
  /**
   * URL for the edit action link.
   */
  editHref?: string;
  /**
   * Click handler for the edit action button. If provided, this will take precedence over `editHref`.
   */
  onEdit?: () => void;
};

export const FormSummarySection = forwardRef<
  HTMLDivElement,
  FormSummarySectionProps
>(function FormSummarySection(
  { children, className, title, level = 3, editHref, onEdit, ...rest },
  ref,
) {
  const hasEditAction = Boolean(editHref || onEdit);
  const renderEditAction = () => {
    if (!hasEditAction) return null;
    if (onEdit) {
      return (
        <Link asChild>
          <button onClick={onEdit}>
            <NotePencilIcon aria-hidden />
            <span>Endre svar</span>
          </button>
        </Link>
      );
    }
    return (
      <Link href={editHref}>
        <NotePencilIcon aria-hidden />
        <span>Endre svar</span>
      </Link>
    );
  };

  return (
    <Card.Block
      className={cl('uds-form-summary__section', className)}
      ref={ref}
      {...rest}
    >
      <div className="uds-form-summary__header">
        <Heading level={level}>{title}</Heading>
        {renderEditAction()}
      </div>

      {children}
    </Card.Block>
  );
});

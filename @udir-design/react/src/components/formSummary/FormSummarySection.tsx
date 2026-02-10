import cl from 'clsx/lite';
import { forwardRef } from 'react';
import { NotePencilIcon } from '@udir-design/icons';
import type { CardBlockProps } from '../card/Card';
import { Card } from '../card/Card';
import { Link } from '../link/Link';
import { Heading } from '../typography/heading/Heading';

export type FormSummarySectionProps = CardBlockProps & {
  title: string;
  level?: 3 | 4 | 5;
  editHref?: string;
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

import { forwardRef, HTMLAttributes } from 'react';
import cl from 'clsx/lite';
import { ArrowDownRightIcon } from '@navikt/aksel-icons';
import { CardProps as DigdirCardProps } from '../card/Card';
import { Card } from '../card/Card';
import { Link } from '../link/Link';
import { Details } from '../details/Details';

export type TocHeading = {
  level: 2 | 3;
  name: string;
  id: string;
};

export type TableOfContentsProps = Omit<
  DigdirCardProps,
  'data-color' | 'asChild' | 'children'
> &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * Headings to be displayed
     * in the tableOfContents
     */
    headings: TocHeading[];
    'data-color'?: 'neutral' | 'accent' | 'support1';
  };

export const TableOfContents = forwardRef<HTMLDivElement, TableOfContentsProps>(
  function TableOfContents({ headings, variant, className, ...rest }, ref) {
    return (
      <Card
        variant={variant}
        className={cl(`uds-table-of-contents`, className)}
        ref={ref}
        {...rest}
      >
        <Details defaultOpen>
          <Details.Summary>Innhold på denne siden</Details.Summary>
          <Details.Content>
            <ol>
              {headings.map((header) => (
                <li key={header.id} className={`level-${header.level}`}>
                  <Link
                    href={`#${header.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${header.id}`)?.scrollIntoView({
                        behavior: 'smooth',
                      });
                    }}
                  >
                    <ArrowDownRightIcon aria-hidden />
                    <span>{header.name}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </Details.Content>
        </Details>
      </Card>
    );
  },
);

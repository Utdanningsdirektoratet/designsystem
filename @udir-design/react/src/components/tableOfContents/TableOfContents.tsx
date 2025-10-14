import cl from 'clsx/lite';
import { forwardRef } from 'react';
import { ArrowDownRightIcon } from '@udir-design/icons';
import { CardProps as DigdirCardProps } from '../card/Card';
import { Card } from '../card/Card';
import { Details } from '../details/Details';
import { Link } from '../link/Link';
import './tableOfContents.css';

export type TocHeading = {
  level: 2 | 3 | 4;
  name: string;
  id: string;
};

export type TableOfContentsProps = Omit<
  DigdirCardProps,
  'data-color' | 'asChild' | 'children'
> & {
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
                  <Link href={`#${header.id}`}>
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

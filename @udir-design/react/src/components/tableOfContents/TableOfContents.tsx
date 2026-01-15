import type { Color } from '@digdir/designsystemet-types';
import cl from 'clsx/lite';
import { forwardRef } from 'react';
import { ArrowDownRightIcon } from '@udir-design/icons';
import type { CardProps as DigdirCardProps } from '../card/Card';
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
   * in the TableOfContents
   */
  headings: TocHeading[];
  'data-color'?: Color;
  /* Defaults the TableOfContents to closed
   * @default false
   */
  defaultClosed?: boolean;
};

export const TableOfContents = forwardRef<HTMLDivElement, TableOfContentsProps>(
  function TableOfContents(
    { headings, variant, defaultClosed = false, className, ...rest },
    ref,
  ) {
    return (
      <Card
        variant={variant}
        className={cl(`uds-table-of-contents`, className)}
        ref={ref}
        {...rest}
      >
        <Details defaultOpen={!defaultClosed}>
          <Details.Summary>Innhold på denne siden</Details.Summary>
          <Details.Content>
            <ol>
              {headings.map((header) => (
                <li key={header.id} className={`level-${header.level}`}>
                  <Link
                    href={`#${header.id}`}
                    onClick={() => {
                      document
                        .querySelector(`#${header.id}`)
                        ?.scrollIntoView({ behavior: 'smooth' });
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

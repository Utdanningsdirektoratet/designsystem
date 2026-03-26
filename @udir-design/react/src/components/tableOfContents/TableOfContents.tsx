import type { Color } from '@digdir/designsystemet-types';
import cl from 'clsx/lite';
import { forwardRef } from 'react';
import { ArrowDownRightIcon } from '@udir-design/icons';
import type { CardProps } from '../card/Card';
import { Card } from '../card/Card';
import type { DetailsProps } from '../details/Details';
import { Details } from '../details/Details';
import { Link } from '../link/Link';
import './tableOfContents.css';

export type TocHeading = {
  level: 2 | 3 | 4;
  name: string;
  id: string;
};

export type TableOfContentsProps = Omit<
  CardProps,
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
  /**
   * Controls open-state.
   *
   * Using this removes automatic control of open-state
   *
   * @default undefined
   */
  open?: boolean;
  /**
   * Callback function when TableOfContents toggles due to click on summary or find in page-search
   */
  onToggle?: (event: Event) => void;
} & (
    | {
        open: boolean;
        onToggle: (event: Event) => void;
      }
    | {
        open?: never;
        onToggle?: (event: Event) => void;
      }
  );

export const TableOfContents = forwardRef<HTMLDivElement, TableOfContentsProps>(
  function TableOfContents(
    {
      headings,
      variant,
      defaultClosed = false,
      className,
      open,
      onToggle,
      ...rest
    },
    ref,
  ) {
    const detailsProps = { open, onToggle } as DetailsProps;
    return (
      <Card
        variant={variant}
        className={cl(`uds-table-of-contents`, className)}
        ref={ref}
        {...rest}
      >
        <Details defaultOpen={!defaultClosed} {...detailsProps}>
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

import { forwardRef, HTMLAttributes } from 'react';
import cl from 'clsx/lite';
import { Heading } from '../typography';
import { ArrowDownRightIcon } from '@navikt/aksel-icons';
import { Card } from '../card/Card';
import { Link } from '../link/Link';

export type TocHeading = {
  level: 2 | 3 | 4 | 5 | 6;
  name: string;
  id: string;
};

// TODO: fix typing - no variant tinted / default
export type TableOfContentsProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Headings to be displayed
   * in the toc
   */
  headings: TocHeading[];
  /**
   * Change the surface color
   * of the toc
   */
  'data-color'?: 'neutral' | 'accent' | 'support1';
  /**
   * Change the surface color
   * of the toc
   */
  'data-size'?: 'sm' | 'md' | 'lg';
};

export const TableOfContents = forwardRef<HTMLDivElement, TableOfContentsProps>(
  function TableOfContents({ headings, className, ...rest }, ref) {
    return (
      <Card
        variant="tinted"
        className={cl(`uds-tableofcontents`, className)}
        ref={ref}
        {...rest}
      >
        <Heading level={2} data-toc-ignore>
          Innhold på siden
        </Heading>
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
      </Card>
    );
  },
);

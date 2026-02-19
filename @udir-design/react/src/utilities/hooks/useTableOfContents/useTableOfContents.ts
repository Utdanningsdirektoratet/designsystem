import { useEffect, useState } from 'react';
import type { TocHeading } from '../../../components/tableOfContents/TableOfContents';

export type useTableOfContentsProps = {
  /**
   * Which headings to include
   * in the TableOfContents
   * @default 'h2,h3'
   */
  headingSelector?: 'h2' | 'h2,h3';
  /**
   * The RefObject of the element
   * to extract headings from
   * @default document
   */
  containerRef?: React.RefObject<HTMLElement | null>;
};

export type useTableOfContentsReturn = {
  headings: TocHeading[];
};

export const useTableOfContents = ({
  containerRef,
  headingSelector = 'h2,h3',
}: useTableOfContentsProps = {}): useTableOfContentsReturn => {
  const [headings, setHeadings] = useState<TocHeading[]>([]);

  useEffect(() => {
    // setState in an effect is fine if the value comes from a ref. Otherwise the react compiler complains.
    // See https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-effect#valid
    const ref = containerRef ?? { current: document.body };
    if (ref?.current) {
      const sectionHeadings = Array.from(ref.current.querySelectorAll('h2,h3'))
        .filter((node) => !node.hasAttribute('data-toc-ignore'))
        .flatMap((node) => {
          if (!node.id) {
            return [];
          }
          const level = parseInt(
            node.tagName.toLowerCase()[1],
          ) as TocHeading['level'];
          const id = node.id;

          const name = (node as HTMLElement).innerText;

          return { level, name, id };
        });
      setHeadings(sectionHeadings);
    }
  }, [containerRef, headingSelector]);
  return { headings: headings };
};

import { TocHeading } from '../../../components/tableOfContents/TableOfContents';
import { useEffect, useState } from 'react';

export type useTableOfContentsProps = {
  /**
   * Which headings to include
   * in the TableOfContents
   * @deafult 'h2,h3'
   */
  headingSelector?: 'h2' | 'h2,h3';
  /**
   * The RefObject of the element
   * to extract headings from
   * @deafult document
   */
  containerRef?: React.RefObject<HTMLElement | null>;
};

type useTableOfContentsReturn = {
  headings: TocHeading[];
};

export const useTableOfContents = ({
  containerRef,
  headingSelector = 'h2,h3',
}: useTableOfContentsProps = {}): useTableOfContentsReturn => {
  const [headings, setHeadings] = useState<TocHeading[]>([]);

  useEffect(() => {
    const container = containerRef?.current ?? document;
    const sectionHeadings = Array.from(
      container.querySelectorAll(headingSelector),
    )
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
  }, [containerRef, headingSelector]);
  return { headings: headings };
};

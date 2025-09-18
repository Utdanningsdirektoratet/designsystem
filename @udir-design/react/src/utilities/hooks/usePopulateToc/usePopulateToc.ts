import { TocHeading } from '../../../components/tableOfContents/TableOfContents';
import { useEffect, useState } from 'react';

export type UsePopulateTocProps = {
  /**
   * The container to generate headings from
   * @default document
   */
  container?: HTMLElement | Document;
};

export const usePopulateToc = ({
  container = document,
}: UsePopulateTocProps = {}) => {
  const [headings, setHeadings] = useState<TocHeading[]>([]);

  const headerTags = 'h2,h3,h4';

  useEffect(() => {
    const sectionHeadings = Array.from(container.querySelectorAll(headerTags))
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
  }, [container]);
  return headings;
};

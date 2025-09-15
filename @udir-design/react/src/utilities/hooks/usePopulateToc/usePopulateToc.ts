import { TocHeading } from '../../../components/tableOfContents/TableOfContents';
import { useEffect, useState } from 'react';

export type UsePopulateTocProps = {
  /**
   * The document to generate headings from
   */
  container?: HTMLElement | null;
};

export const usePopulateToc = ({ container }: UsePopulateTocProps = {}) => {
  const [hmm, setHmm] = useState<TocHeading[]>([]);

  const headerTags = 'h2,h3,h4';

  useEffect(() => {
    const el = container ?? document;

    const headings = Array.from(el.querySelectorAll(headerTags))
      .filter((node) => !node.hasAttribute('data-toc-ignore'))
      .map((node) => {
        const level = parseInt(
          node.tagName.toLowerCase()[1],
        ) as TocHeading['level'];
        const id = node.id;

        const name = (node as HTMLElement).innerText;

        return { level, name, id };
      });

    setHmm(headings);
  }, [container]);
  return hmm;
};

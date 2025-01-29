import { renderToStaticMarkup } from 'react-dom/server';
import { Markdown, Unstyled } from '@storybook/blocks';
import type { Heading, Root, RootContent, Text } from 'mdast';
import { toHast } from 'mdast-util-to-hast';
import { toHtml } from 'hast-util-to-html';
import { visit } from 'unist-util-visit';
import remarkParse from 'remark-parse';
import remarkHeadingId from 'remark-heading-id';
import type { RemarkHeadingIdOptions } from 'remark-heading-id';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { applyTo, dropWhile, pipe, takeWhile } from 'ramda';
import { componentOverrides } from '../preview';
import { SeverityColors } from '@digdir/designsystemet-react/colors';
import { Alert } from '../../src/components/alert/Alert';
import { Heading as H } from '../../src/components/typography/heading/Heading';
import { useMemo } from 'react';

interface Props {
  markdown: string;
  sectionId?: string;
  increaseHeadingDepthBy?: number;
}
export const IncludeMarkdown: React.FC<Props> = ({
  markdown,
  sectionId,
  increaseHeadingDepthBy = 0,
}) => {
  const content = useMemo(
    () =>
      unified()
        .use(remarkParse)
        .use(remarkHeadingId, {
          defaults: true,
        } satisfies RemarkHeadingIdOptions)
        .use(remarkGetSection, { sectionId })
        .use(remarkIncreaseHeadingDepth, { increaseBy: increaseHeadingDepthBy })
        .use(remarkGithubAlert)
        .use(remarkStringify)
        .processSync(markdown),
    [increaseHeadingDepthBy, markdown, sectionId]
  );

  return (
    <Markdown options={{ overrides: componentOverrides }}>
      {content.toString()}
    </Markdown>
  );
};

declare module 'mdast' {
  export interface HeadingData {
    id: string;
  }
}

interface RemarkGetSectionOptions {
  sectionId?: string;
}

function remarkGetSection({ sectionId }: RemarkGetSectionOptions) {
  return function (tree: Root): void {
    const isWantedHeading = (x: RootContent): x is Heading =>
      x.type === 'heading' &&
      sectionId !== undefined &&
      x.data?.id === sectionId;

    const wantedHeading = tree.children.find(isWantedHeading);
    if (!wantedHeading) {
      return;
    }

    const isInThisSection = (x: RootContent) =>
      x.type !== 'heading' ||
      x.data?.id === sectionId ||
      x.depth > wantedHeading.depth;

    const newChildren = applyTo(tree.children)(
      pipe(
        dropWhile((x) => !isWantedHeading(x)),
        takeWhile(isInThisSection)
      )
    );
    tree.children = newChildren;
  };
}

interface RemarkIncreaseHeadingDepthOptions {
  increaseBy: number;
}
function remarkIncreaseHeadingDepth({
  increaseBy,
}: RemarkIncreaseHeadingDepthOptions) {
  return function (tree: Root): void {
    visit(tree, 'heading', (heading) => {
      heading.depth += increaseBy;
    });
  };
}

type AlertData = { type: SeverityColors; heading: string };

const alertMap: Record<string, AlertData> = {
  NOTE: { type: 'info', heading: 'Legg merke til' },
  TIP: { type: 'success', heading: 'Tips' },
  IMPORTANT: { type: 'warning', heading: 'Viktig' },
  WARNING: { type: 'warning', heading: 'Advarsel' },
  CAUTION: { type: 'danger', heading: 'Utvis forsiktighet' },
};

const githubAlertTypesRegex = /\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)]\n/;

function remarkGithubAlert() {
  return function (tree: Root): void {
    visit(tree, 'blockquote', (blockquote, index, parent) => {
      if (!index || !parent) {
        return;
      }
      const blockquoteStart = blockquote.position?.start.line;
      let alertData: AlertData | undefined;
      if (!blockquoteStart) {
        return;
      }

      visit(
        blockquote,
        (node): node is Text =>
          node.type === 'text' && node.position?.start.line === blockquoteStart,
        (text) => {
          const matches = text.value.match(githubAlertTypesRegex);
          if (matches && matches[1]) {
            text.value = text.value.replace(githubAlertTypesRegex, '');
            alertData = alertMap[matches[1]];
          }
        }
      );

      if (alertData) {
        parent.children[index] = {
          type: 'html',
          value: renderToStaticMarkup(
            <Unstyled style={{ marginBottom: 'var(--ds-spacing-6)' }}>
              <Alert data-color={alertData.type}>
                <H data-size="xs" level={2}>
                  {alertData.heading}
                </H>
                <div
                  dangerouslySetInnerHTML={{
                    __html: toHtml(
                      toHast({ type: 'root', children: blockquote.children })
                    ),
                  }}
                />
              </Alert>
            </Unstyled>
          ),
        };
      }
    });
  };
}

import type { SeverityColors } from '@digdir/designsystemet-react/colors';
import { Markdown } from '@storybook/addon-docs/blocks';
import { toHtml } from 'hast-util-to-html';
import type { Root, Text } from 'mdast';
import { toHast } from 'mdast-util-to-hast';
import { Fragment, useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import {
  remarkGetSection,
  remarkSlugHeadings,
} from '../../utils/remarkGetSection.js';
import { componentOverrides } from '../ComponentOverrides';
import componentStyles from '../componentOverrides.module.scss';
import { SimpleAlert } from './SimpleAlert/SimpleAlert';

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
        .use(remarkSlugHeadings)
        .use(remarkGetSection, { sectionId })
        .use(remarkIncreaseHeadingDepth, { increaseBy: increaseHeadingDepthBy })
        .use(remarkGithubAlert)
        .use(remarkStringify)
        .processSync(markdown),
    [increaseHeadingDepthBy, markdown, sectionId],
  );

  return (
    <Markdown
      options={{
        overrides: {
          ...componentOverrides,
          code: (props: Props) => (
            <code
              {...props}
              className={`sb-unstyled ${componentStyles.code}`}
            />
          ),
        },
        wrapper: Fragment,
      }}
    >
      {content.toString()}
    </Markdown>
  );
};

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

type AlertData = { type: SeverityColors | 'tip'; heading: string };

const alertMap: Record<string, AlertData> = {
  NOTE: { type: 'info', heading: 'Legg merke til' },
  TIP: { type: 'tip', heading: 'Tips' },
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
        },
      );

      if (alertData) {
        parent.children[index] = {
          type: 'html',
          value: renderToStaticMarkup(
            <SimpleAlert type={alertData.type} heading={alertData.heading}>
              <div
                className="sb-unstyled"
                dangerouslySetInnerHTML={{
                  __html: toHtml(
                    toHast({ type: 'root', children: blockquote.children }),
                  ),
                }}
              />
            </SimpleAlert>,
          ),
        };
      }
    });
  };
}

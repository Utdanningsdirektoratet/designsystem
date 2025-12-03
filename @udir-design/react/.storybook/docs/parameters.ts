import type { DocsTypes } from '@storybook/addon-docs';
import { DocsContainer } from '.storybook/docs/components/DocsContainer';
import customTheme from '.storybook/docs/customTheme';
import type { MdxComponentOverrides } from '.storybook/types';
import { componentOverrides } from './ComponentOverrides';
import { hideTocForIds } from './components/HideToc';

export const docsParameters: DocsTypes['parameters']['docs'] & {
  components?: MdxComponentOverrides;
} = {
  container: DocsContainer,
  // Configure the table of contents
  toc: {
    title: 'På denne siden',
    headingSelector: 'h2',
    unsafeTocbotOptions: {
      headingObjectCallback(obj: object): object | void {
        if (hideTocForIds.size > 0) {
          const params = new URLSearchParams(window.location.search);
          const pageId = params.get('id');
          if (pageId && hideTocForIds.has(pageId)) {
            return;
          }
        }
        return obj;
      },
    },
  },
  theme: customTheme,
  components: componentOverrides,
};

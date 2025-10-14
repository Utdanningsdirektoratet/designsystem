import { Parameters } from '@storybook/react-vite';
import { DocsContainer } from '.storybook/docs/components/DocsContainer';
import customTheme from '.storybook/docs/customTheme';
import { componentOverrides } from './ComponentOverrides';
import { hideTocForIds } from './components/HideToc';

export const docsParameters: Required<Parameters>['docs'] = {
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

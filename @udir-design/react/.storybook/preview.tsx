import './style.css';
import './docs/customTheme.scss';
import type { Preview } from '@storybook/react-vite';
import { INITIAL_VIEWPORTS, type ViewportMap } from 'storybook/viewport';
import { docsParameters } from './docs/parameters';
import { customStylesDecorator } from './utils/customStylesDecorator';

// See the complete list of available devices in INITIAL_VIEWPORTS here:
// https://storybook.js.org/docs/essentials/viewport#use-a-detailed-set-of-devices
const storybookViewports: ViewportMap = {
  minimum: INITIAL_VIEWPORTS['iphone5'],
  iphone6: INITIAL_VIEWPORTS['iphone6'],
  ipad: INITIAL_VIEWPORTS['ipad'],
  desktop: {
    name: 'Desktop',
    styles: { width: '1200px', height: '100%' },
    type: 'desktop',
  },
};

const chromaticViewports = {
  desktop: { viewport: { width: 1200 } },
};

const preview: Preview = {
  tags: ['autodocs', 'a11y-test'],
  parameters: {
    options: {
      storySort: {
        order: [
          'Introduksjon',
          'design-tokens',
          ['Oversikt', '*'],
          'iconsandsymbols',
          ['Retningslinjer', 'Ikoner'],
          'demo',
          'components',
        ],
      },
    },

    docs: docsParameters,

    viewport: {
      options: storybookViewports,
    },

    chromatic: {
      modes: chromaticViewports,
    },

    a11y: {
      test: 'error',
    },
  },
  initialGlobals: {
    viewport: { value: 'desktop' },
  },
  decorators: customStylesDecorator,
};

export default preview;

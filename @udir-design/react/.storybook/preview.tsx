import './style.css';
import './docs/customTheme.scss';
import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import { definePreview } from '@storybook/react-vite';
import type { PreviewAddon } from 'storybook/internal/csf';
import { INITIAL_VIEWPORTS, type ViewportMap } from 'storybook/viewport';
import storybookAddonPseudoStates from 'storybook-addon-pseudo-states';
import { docsParameters } from './docs/parameters';
import { testLifecycleHooks } from './preview-test';
import type {
  ChromaticParameters,
  ComponentOriginParameters,
  CustomStylesParameters,
} from './types';
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

export default definePreview({
  tags: ['a11y-test'],

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
          'patterns',
          ['Introduksjon', '*'],
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

  decorators: [customStylesDecorator],

  addons: [
    addonA11y(),
    storybookAddonPseudoStates(),
    addonDocs(),
    customParametersAddon(),
  ],
  ...testLifecycleHooks,
});

interface CustomTypes {
  parameters: ComponentOriginParameters &
    CustomStylesParameters &
    ChromaticParameters;
}
function customParametersAddon(): PreviewAddon<CustomTypes> {
  return {};
}

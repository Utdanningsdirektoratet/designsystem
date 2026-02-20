import './style.css';
import './docs/customTheme.scss';
import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import { definePreview } from '@storybook/react-vite';
import * as R from 'ramda';
import { type PreviewAddon, definePreviewAddon } from 'storybook/internal/csf';
import { INITIAL_VIEWPORTS, type ViewportMap } from 'storybook/viewport';
import storybookAddonPseudoStates from 'storybook-addon-pseudo-states';
import { type SourceLinkParameter } from 'storybook-addon-source-link';
import * as addonSourceLinkPreview from 'storybook-addon-source-link/preview';
import * as icons from '@udir-design/icons';
import { docsParameters } from './docs/parameters';
import { testLifecycleHooks } from './preview-test';
import type {
  ChromaticParameters,
  ComponentOriginParameters,
  CustomStylesParameters,
} from './types';
import { customStylesDecorator } from './utils/customStylesDecorator';

// Fix icons being displayed as React.ForwardRef in Storybook code examples
for (const iconName of R.keys(icons)) {
  icons[iconName].displayName = iconName;
}

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

const GIT_BRANCH = import.meta.env['VITE_GIT_BRANCH_NAME'];

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

    sourceLink: {
      // TODO: It only works in a story, not on the docs page :(
      links: {
        'addon-powered-by': () => {
          return undefined;
        },
        'single-story-github': ({ importPath, rootPath, name }) => {
          // Unsure if we want this -- it will always search the main branch due to Github limitations
          if (!rootPath) return undefined;
          const srcPathSegment = importPath.replace(/^\.\//, '');
          const searchQuery = `repo:Utdanningsdirektoratet/designsystem path:@udir-design/react/${srcPathSegment} "export const ${name}"`;
          const href = `https://github.com/search?q=${encodeURIComponent(searchQuery)}&type=code`;
          return {
            label: `Source code for story ${name}`,
            href,
            icon: 'GithubIcon',
            order: Number.MIN_SAFE_INTEGER + 1,
          };
        },
        'stories-github': ({ importPath, rootPath }) => {
          if (!rootPath) return undefined;
          const href = `https://github.com/Utdanningsdirektoratet/designsystem/blob/${GIT_BRANCH}/@udir-design/react${importPath.replace(
            /^\./,
            '',
          )}`;
          return {
            label: 'Stories source code',
            href,
            icon: 'GithubIcon',
            order: Number.MIN_SAFE_INTEGER + 1,
          };
        },
        'component-github': ({ importPath, rootPath, title }) => {
          if (!title.includes('components')) return undefined;
          if (!rootPath) return undefined;
          const componentPath = importPath.replace(/\.stories\.tsx?$/, '.tsx');
          const href = `https://github.com/Utdanningsdirektoratet/designsystem/blob/${GIT_BRANCH}/@udir-design/react${componentPath.replace(
            /^\./,
            '',
          )}`;
          return {
            label: 'Component source code',
            href,
            icon: 'GithubIcon',
            order: Number.MIN_SAFE_INTEGER,
          };
        },
      },
    },
  },

  initialGlobals: {
    viewport: { value: 'desktop' },
  },

  decorators: [customStylesDecorator],

  addons: [
    addonSourceLink(),
    addonA11y(),
    storybookAddonPseudoStates(),
    addonDocs(),
    customParametersAddon(),
  ],
  ...testLifecycleHooks,
});

function addonSourceLink() {
  return definePreviewAddon<{
    parameters: { sourceLink?: SourceLinkParameter };
  }>({
    ...addonSourceLinkPreview,
  });
}
interface CustomTypes {
  parameters: ComponentOriginParameters &
    CustomStylesParameters &
    ChromaticParameters;
}
function customParametersAddon(): PreviewAddon<CustomTypes> {
  return {};
}

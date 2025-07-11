/*
 * Note that this file does not use the .d.ts extension, as .d.ts files are
 * excluded from type checking when compilerOptions.skipLibCheck === true.
 * That setting is required due to type errors or config differences in the
 * type definitions of some of our dependencies.
 *
 * See https://github.com/microsoft/TypeScript/issues/30511 for details.
 */

import type {} from 'storybook/internal/types';
import type { DocsParameters } from '@storybook/addon-docs';
import type { A11yParameters } from '@storybook/addon-a11y';
import type { CSSProperties, ReactNode } from 'react';
import { ThemeVars } from 'storybook/theming';
import { StoryContext } from '@storybook/react-vite';

type ChromaticViewport = {
  width?: number | `${string}px`;
  height?: number | `${string}px`;
};

type PseudoState =
  | 'hover'
  | 'active'
  | 'focusVisible'
  | 'focusWithin'
  | 'focus'
  | 'visited'
  | 'link'
  | 'target';

type PseudoValue = boolean | string | string[];

export type MdxComponentOverrides = {
  [K in keyof React.JSX.IntrinsicElements]?: React.FC<
    Omit<React.JSX.IntrinsicElements[K], 'data-size' | 'data-color'>
  >;
} & Record<string, React.FC>;

type SourceBlockParameters = NonNullable<DocsParams['source']>;

type DocsParams = Required<DocsParameters>['docs'];
// Use Partial here to make `of` not required when setting parameters.docs.{canvas,source}
type DocsCanvasParams = Partial<DocsParams['canvas']>;
type DocsSourceParams = Partial<Omit<SourceBlockParameters, 'transform'>> & {
  /** Source code transformations */
  transform?: (
    code: string,
    storyContext: StoryContext,
  ) => string | Promise<string>; // original type doesn't allow Promise, although support for this was added in 9.0.0. See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#parametersdocssourceformat-removal
};

declare module 'storybook/internal/types' {
  interface Parameters extends A11yParameters, DocsParameters {
    /**
     * Set custom styling for the story's root element. The default styling is:
     * ```css
     * { overflow: hidden; padding: 1rem; }
     * ```
     *
     * This is a custom parameter, implemented by `customStylesDecorator.ts`.
     * */
    customStyles?: CSSProperties & {
      /** Styles that only apply when viewing a docs page */
      docs?: CSSProperties;
      /** Styles that only apply when viewing an individual story */
      story?: CSSProperties;
    };

    /**
     * Set the story layout.
     *
     * This is a standard Storybook parameter,
     * [see the docs](https://storybook.js.org/docs/configure/story-layout)
     */
    layout?: 'centered' | 'fullscreen' | 'padded';

    a11y?: A11yParameters['a11y'] & {
      /**
       * - `'todo'` - show a11y violations in the test UI only
       * - `'error'` - fail CI on a11y violations
       * - `'off'` - skip a11y checks entirely
       */
      test?: 'todo' | 'error' | 'off';
    };

    /**
     * Configure Chromatic. See [the documentation](https://www.chromatic.com/docs/config-with-story-params/).
     */
    chromatic?: {
      /** Disable visual snapshots at the global, component or story level */
      disableSnapshot?: boolean;
      /**
       * By default, CSS animations are paused at the end of their animation cycle
       * when tests are run in Chromatic. Setting this to false will pause animations
       * at the first frame instead.
       */
      pauseAnimationAtEnd?: false;
      /** Delay in ms before running tests in Chromatic */
      delay?: number;
      /**
       * Allows you to fine-tune the threshold for visual change between snapshots before
       * Chromatic flags them. Must be a number from 0 to 1. 0 is the most accurate, while
       * 1 is the least accurate.
       *
       * @default 0.063
       */
      diffThreshold?: number;
      /**
       * Modes allow separate snapshots and baselines for a collection
       * of parameters like viewport size, theme etc.
       */
      modes?: Record<
        string,
        {
          /**
           * Disable a mode that has been enabled at a higher level.
           * E.g. disable a global mode for a specific story.
           **/
          disable?: true;
          /**
           * The viewport to use.
           *
           * This parameter can either be an object with height and/or width (in px), or
           * the name of one of the viewports configured in `parameters.viewports` in `.storybook/preview.tsx`
           */
          viewport?: ChromaticViewport | string;
          // ...any other globals from Storybook, addons or decorators which we want
          // to use in modes can also be added here
        }
      >;
    };

    docs?: Omit<DocsParams, 'canvas' | 'source'> & {
      canvas?: DocsCanvasParams;
      source?: DocsSourceParams;
      components?: MdxComponentOverrides;
      theme?: ThemeVars;
      toc?:
        | boolean
        | {
            /**
             * Defines the container's CSS selector for search for the headings
             * @example
             * '.sbdocs-content'
             */
            contentsSelector?: string;
            /**
             * Hides the table of contents for the documentation pages
             */
            disable?: boolean;
            /**
             * Defines the list of headings to feature in the table of contents
             * @example
             * 'h1, h2, h3'
             */
            headingSelector?: string;
            /**
             * Configures the table of contents to ignore specific headings or stories.
             * By default, the table of contents will ignore all content placed within Story blocks
             * @example
             * '.docs-story h2'
             */
            ignoreSelector?: string;
            /**
             * Defines a title caption for the table of contents.
             * @default null
             * @example 'Table of Contents'
             */
            title?: ReactNode;
            /**
             * Provides additional TocBot configuration options.
             * See https://github.com/tscanlin/tocbot/blob/master/index.d.ts
             */
            unsafeTocbotOptions?: Record<string, unknown>;
          };
    };

    /**
     * Toggle pseudo states. Supported states are listed in {@link PseudoState}.
     * Read [Storybook Pseudo States documentation](https://github.com/chromaui/storybook-addon-pseudo-states)
     * for more info.
     *
     * Each state can be toggled on/off:
     * ```ts
     * export const Hover = () => <Button>Label</Button>
     * Hover.parameters = { pseudo: { hover: true } }
     * ```
     *
     * You can also use CSS selectors to target the elements you want to enable the state for:
     * ```ts
     * export const Buttons = () => (
     *   <>
     *     <Button id="one">Hover</Button>
     *     <Button id="two">Hover focus</Button>
     *     <Button id="three">Hover focus active</Button>
     *   </>
     * )
     * Buttons.parameters = {
     *   pseudo: {
     *     hover: ["#one", "#two", "#three"],
     *     focus: ["#two", "#three"],
     *     active: "#three",
     *   },
     * }
     * ```
     */
    pseudo?: {
      /**
       * If you need to render elements outside Storybook's root element, you can set
       * rootSelector to override it. This is convenient for portals, dialogs, tooltips, etc.
       * @default "#storybook-root"
       */
      rootSelector?: string;
    } & {
      [K in PseudoState]?: PseudoValue;
    };
  }
}

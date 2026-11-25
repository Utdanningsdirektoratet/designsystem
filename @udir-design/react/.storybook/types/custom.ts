import type { CSSProperties, ReactNode } from 'react';

export type ComponentOrigin = {
  name?: string;
  originator: 'self' | 'digdir' | 'nav';
  details?: ReactNode;
};
export type ComponentOriginParameters = {
  componentOrigin?: ComponentOrigin;
};

export type CustomStylesParameters = {
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
};

export type StoryCssParameters = {
  /**
   * CSS that the story's example needs besides the components' own styling, such as the
   * layout of the elements around them. Write it with the `css` tag from
   * `.storybook/utils/css`, so oxfmt formats it.
   *
   * Readers should put this CSS in their own CSS file, not in a `<style>` element, which a
   * strict Content Security Policy blocks. So docs pages show it in its own code block, apart
   * from the JSX, while the story renders it as a `<style>` element.
   *
   * This is a custom parameter, implemented by `withStoryCss.tsx` and by the `Canvas` in
   * `docs/components/Canvas.tsx`. MDX pages get that `Canvas` through `docs.components`,
   * even when they import `Canvas` from `@storybook/addon-docs/blocks`.
   * */
  css?: string;
};

export type SnapshotParameters = {
  /**
   * Set to `false` to skip the DOM snapshot that is otherwise taken after every story.
   *
   * Useful for stories that only assert behaviour: they still run as tests, but do not
   * leave a baseline that has to be reviewed and kept up to date.
   *
   * This is a custom parameter, implemented by `preview-test.ts`.
   * */
  snapshot?: boolean;
};

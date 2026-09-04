import type { CSSProperties } from 'react';

export type ComponentOrigin = {
  name?: string;
  originator: 'self' | 'digdir' | 'nav';
  details?: string;
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

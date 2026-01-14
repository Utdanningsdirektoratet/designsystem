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

import type { Color, Size } from '@digdir/designsystemet-types';

/**
 * Augments React's global HTML attributes. Published as `@udir-design/react/html` and
 * opted into through the `types` array in `tsconfig.json`, see 2864ef9c.
 *
 * `@digdir/designsystemet-react` declares much the same set in its own
 * `react-types.d.ts`, behind an opt-in `./react-types` export. We keep our own copy
 * rather than referencing theirs, because theirs points `data-color` at
 * https://theme.designsystemet.no, which our consumers should not use.
 */
declare global {
  // oxlint-disable-next-line @typescript-eslint/no-namespace
  namespace React {
    // oxlint-disable-next-line @typescript-eslint/no-unused-vars
    interface HTMLAttributes<T> {
      'data-size'?: Size | (string & {});
      'data-color'?: Color | (string & {});
      'data-color-scheme'?: 'light' | 'dark' | 'auto';
      // Make React 18 support popover attributes https://github.com/facebook/react/issues/27479
      popovertarget?: string;
      popover?: '' | 'auto' | 'manual' | 'hint';
      /**
       * Give the focusable children of this element arrow key navigation, a single
       * tab stop, and memory of the last focused element.
       *
       * The value is a space-separated list of tokens. It must contain one behavior
       * token (`toolbar`, `tablist`, `radiogroup`, `listbox`, `menu` or `menubar`),
       * which also decides the ARIA roles that get applied. It may additionally contain
       * `inline`, `block`, `wrap`, `nowrap` and `nomemory` to override the defaults that
       * follow from the behavior, in the conventional order
       * [documented by open-ui.org](https://open-ui.org/components/scoped-focusgroup.explainer/):
       * `focusgroup="<behavior> [inline|block] [wrap|nowrap] [nomemory]"`.
       *
       * Set `focusgroup="none"` on a child to split the surrounding focusgroup into
       * separate segments at that point.
       *
       * @example 'toolbar'
       * @example 'menu inline nowrap'
       * @example 'none'
       */
      focusgroup?: FocusgroupValue;
      /**
       * Mark this element as the one that receives focus the first time the
       * surrounding focusgroup is focused.
       */
      focusgroupstart?: boolean;
    }
    // Make React support command attributes https://github.com/facebook/react/issues/27479
    interface ButtonHTMLAttributes<T> extends React.HTMLAttributes<T> {
      command?: string;
      commandfor?: string;
    }
  }
}

export type FocusgroupBehavior =
  | 'toolbar'
  | 'tablist'
  | 'radiogroup'
  | 'listbox'
  | 'menu'
  | 'menubar';

export type FocusgroupAxis = 'inline' | 'block';
export type FocusgroupWrap = 'wrap' | 'nowrap';
export type FocusgroupMemory = 'nomemory';
/**
 * Type based on the conventional order from https://open-ui.org/components/scoped-focusgroup.explainer/
 */
export type FocusgroupValue =
  | 'none'
  | `${FocusgroupBehavior}${` ${FocusgroupAxis}` | ''}${` ${FocusgroupWrap}` | ''}${` ${FocusgroupMemory}` | ''}`;

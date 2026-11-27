import type { Decorator } from '@storybook/react-vite';
import type { StoryCssParameters } from '.storybook/types';

/**
 * Renders a story's `parameters.css` as a `<style>` element, so the story looks as it would
 * with that CSS in the app's own stylesheet. Docs pages show the CSS in its own code block
 * instead of in the JSX, see `docs/components/Canvas.tsx`.
 *
 * Storybook is not served with a Content Security Policy, so a `<style>` element is fine here.
 */
export const withStoryCss: Decorator = (Story, { parameters }) => {
  const { css } = parameters as StoryCssParameters;
  return (
    <>
      {css && <style>{css}</style>}
      <Story />
    </>
  );
};

import type { Decorator } from '@storybook/react-vite';
import React from 'react';
import { useContext, useEffect, useState } from 'react';

const IsInertContext = React.createContext<boolean | null>(null);

/** Use this decorator to initially render a story in an inert state, e.g. to prevent the story
 * from stealing focus and scrolling the reader to the middle of a documentation page.
 *
 * It sets the `inert` attribute on a parent element of the story, which is usually enough to block
 * focus stealing. However, if the element that steals focus renders in the top layer (e.g. a `Dialog`)
 * you must additionally do something like this in the story:
 * ```
 * const isInert = useIsInert();
 * return (
 *   <Dialog
 *     open={true}
 *     {...(isInert && { inert: true })} // this is the important line
 *   >
 *     <SomeContent />
 *   </Dialog>
 * )
 * ```
 *
 */
export const WithInertInitialRender: Decorator = (Story, context) => {
  if (context.viewMode === 'story') {
    // Hacky way to detect docs mode in iframe-rendered story
    const isInDocsPage =
      window.parent.location.search.includes('viewMode=docs');
    if (isInDocsPage) {
      // Set viewMode since Storybook doesn't detect it properly when rendered with "inline: false" (iframe mode)
      context.viewMode = 'docs';
    }
  }
  const [inert, setInert] = useState(context.viewMode === 'docs');
  useEffect(() => {
    setTimeout(() => setInert(false), 500);
  }, []);
  return (
    <div data-storybook-decorator inert={inert}>
      <IsInertContext value={inert}>
        <Story />
      </IsInertContext>
    </div>
  );
};

/**
 * This hook is necessary to use the `WithInertInitialRender` decorator for Dialog or other
 * elements that render in the top layer, because they are unaffected by the `inert` attribute
 * set on an ancestor
 */
export function useIsInert(): boolean {
  const isInert = useContext(IsInertContext);
  if (isInert === null) {
    throw new Error(
      'You must add the decorator WithInertInitialRender to the story for the useIsInert hook to work',
    );
  }
  return isInert;
}

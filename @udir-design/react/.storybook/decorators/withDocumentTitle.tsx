import type { Decorator } from '@storybook/react-vite';

/**
 * Names a story opened on its own, such as at `iframe.html?id=…`, after the
 * story and its component, such as "Upload And Validate – FileUpload".
 * Storybook names the page after the story id, which a screen reader reads
 * out in full when the page loads: "components bindestrek fileupload
 * bindestrek bindestrek upload bindestrek and bindestrek validate".
 *
 * Set as the story renders, after Storybook has set its own title for the
 * story it selected. Docs pages are left alone: the title of the page around
 * them is the one that is read.
 */
export const withDocumentTitle: Decorator = (
  Story,
  { viewMode, name, title },
) => {
  if (viewMode === 'story') {
    document.title = `${name} – ${title.split('/').at(-1)}`;
  }
  return <Story />;
};

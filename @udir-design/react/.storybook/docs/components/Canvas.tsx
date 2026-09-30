import { Canvas as OriginalCanvas, useOf } from '@storybook/addon-docs/blocks';
import { GithubIcon, ShareAltIcon } from '@storybook/icons';
import type { ComponentProps } from 'react';
import {
  getCanvasSourceHref,
  getCanvasStoryHref,
} from '../../utils/canvasActions';

export function Canvas(props: ComponentProps<typeof OriginalCanvas>) {
  const { story } = useOf(props.of || 'story', ['story']);
  const fileName: unknown = story.parameters.fileName;
  const githubHref =
    typeof fileName === 'string' && fileName
      ? getCanvasSourceHref(fileName, __GIT_BRANCH__)
      : undefined;
  const customActions =
    props.additionalActions ??
    story.parameters.docs?.canvas?.additionalActions ??
    [];

  return (
    <OriginalCanvas
      {...props}
      additionalActions={[
        ...customActions,
        {
          title: (
            <>
              <GithubIcon aria-hidden /> Open in GitHub
            </>
          ),
          disabled: !githubHref,
          onClick: () => {
            if (githubHref) {
              window.open(githubHref, '_blank', 'noopener,noreferrer');
            }
          },
        },
        {
          title: (
            <>
              <ShareAltIcon aria-hidden /> Open in new tab
            </>
          ),
          onClick: () => {
            const previewUrl = (
              globalThis as typeof globalThis & {
                PREVIEW_URL?: string;
              }
            ).PREVIEW_URL;
            window.open(
              getCanvasStoryHref(story.id, previewUrl),
              '_blank',
              'noopener,noreferrer',
            );
          },
        },
      ]}
    />
  );
}

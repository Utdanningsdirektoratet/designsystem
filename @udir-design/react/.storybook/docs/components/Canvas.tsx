import { Canvas as OriginalCanvas, useOf } from '@storybook/addon-docs/blocks';
import { GithubIcon, MarkupIcon, ShareAltIcon } from '@storybook/icons';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { StoryCssParameters } from '../../types';
import {
  getCanvasSourceHref,
  getCanvasStoryHref,
} from '../../utils/canvasActions';
import { StoryCode } from './StoryCode/StoryCode';

export function Canvas(props: ComponentProps<typeof OriginalCanvas>) {
  const { story } = useOf(props.of || 'story', ['story']);
  const fileName: unknown = story.parameters.fileName;
  const githubHref =
    typeof fileName === 'string' && fileName
      ? getCanvasSourceHref(
          fileName,
          __GIT_BRANCH__,
          story.parameters.udirSourceLocation,
        )
      : undefined;
  const customActions =
    props.additionalActions ??
    story.parameters.docs?.canvas?.additionalActions ??
    [];
  const { css } = story.parameters as StoryCssParameters;
  const sourceState = props.sourceState ?? 'hidden';
  // Stories with CSS get our own code panel, with the JSX and the CSS in tabs
  const showsStoryCode = !!css && sourceState !== 'none';
  const [codeShown, setCodeShown] = useState(sourceState === 'shown');

  return (
    <>
      <OriginalCanvas
        {...props}
        sourceState={showsStoryCode ? 'none' : props.sourceState}
        additionalActions={[
          ...(showsStoryCode
            ? [
                {
                  title: (
                    <>
                      <MarkupIcon aria-hidden />{' '}
                      {codeShown ? 'Hide code' : 'Show code'}
                    </>
                  ),
                  onClick: () => setCodeShown(!codeShown),
                },
              ]
            : []),
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
      {showsStoryCode && codeShown && (
        <StoryCode
          of={props.of}
          name={story.name}
          css={css}
          transform={story.parameters.docs?.source?.transform}
        />
      )}
    </>
  );
}

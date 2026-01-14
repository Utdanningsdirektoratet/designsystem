import type { ReactStory, ReactTypes } from '@storybook/react-vite';
import type { StoryAnnotations } from 'storybook/internal/types';

export function makeStoryTransformer(
  transformer: <
    T extends ReactTypes,
    TInput extends StoryAnnotations<T, T['args']>,
  >(
    originalStory: ReactStory<T, TInput>,
  ) => StoryAnnotations<T, T['args']>,
) {
  return transformer;
}

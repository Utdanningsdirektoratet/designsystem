import type { ReactPreview } from '@storybook/react-vite';
import type { DecoratorFunction } from 'storybook/internal/types';
import type preview from '.storybook/preview';

type ExtractAddonTypes<T> = T extends ReactPreview<infer A> ? A : never;

export type AddonTypes = ExtractAddonTypes<typeof preview>;

export type DecoratorType = DecoratorFunction<AddonTypes>;

export type Parameters = NonNullable<typeof preview.composed.parameters>;

export type MdxComponentOverrides = {
  [K in keyof React.JSX.IntrinsicElements]?: React.FC<
    Omit<React.JSX.IntrinsicElements[K], 'data-size' | 'data-color'>
  >;
} & Record<string, React.FC>;

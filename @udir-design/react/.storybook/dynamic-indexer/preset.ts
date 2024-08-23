import type { StorybookConfig } from '@storybook/types';
import { vite, webpack } from './unplugin';
import { DynamicIndexerOptions, storyGenerator } from './storyGenerator';

export const experimental_indexers: StorybookConfig['experimental_indexers'] = (
  config,
  options
) => {
  const presetOptions = options as unknown as DynamicIndexerOptions;
  return [...(config ?? []), storyGenerator(presetOptions)];
};

type BuilderConfig = {
  plugins?: unknown[];
};

export const viteFinal = async (
  config: BuilderConfig,
  options: DynamicIndexerOptions
) => {
  const { plugins = [] } = config;
  plugins.push(vite(options));
  config.plugins = plugins;
  return config;
};

export const webpackFinal = async (
  config: BuilderConfig,
  options: DynamicIndexerOptions
) => {
  const { plugins = [] } = config;
  plugins.push(webpack(options));
  config.plugins = plugins;
  return config;
};

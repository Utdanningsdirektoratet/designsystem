import type { Parameters } from 'storybook/internal/types';
import type { ChromaticViewport } from '.storybook/types/parameters';

export const demoChromaticModes = {
  desktop: { viewport: { width: 1200 } },
  tablet: { viewport: { width: 768 } },
  mobile: { viewport: { width: 375 } },
  minimum: { viewport: { width: 320 } },
} satisfies Record<string, { viewport: ChromaticViewport }>;

export const demoParameters: Parameters = {
  layout: 'fullscreen',
  customStyles: {
    padding: 0,
  },
  chromatic: { modes: demoChromaticModes },
};

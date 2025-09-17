import { ChromaticViewport } from '.storybook/types/parameters';

export const demoChromaticModes: Record<
  string,
  { viewport: ChromaticViewport }
> = {
  desktop: { viewport: { width: 1200 } },
  tablet: { viewport: { width: 768 } },
  mobile: { viewport: { width: 375 } },
  minimum: { viewport: { width: 320 } },
};

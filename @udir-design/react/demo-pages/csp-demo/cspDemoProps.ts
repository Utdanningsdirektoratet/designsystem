/** Props that `CspDemo` passes to components that style themselves from props */
export type CspDemoProps = {
  /** `maxWidth` of `Header` and `Footer`, in pixels so that it equals the computed value */
  maxWidth: string;
  /** `size` of `Logo`, `LogoSymbol` and the symbol */
  size: string;
  /** `value` of the `ProgressBar`, whose `max` is `progressMax` */
  progressValue: number;
  /** `width` and `height` of `Skeleton` */
  skeletonSize: number;
  /** `text` of `DemoBanner` */
  bannerText: string;
};

export const progressMax = 4;

/**
 * The props before and after the CSP check changes them, to check that hydration and updates
 * don't add inline styles either
 */
export const cspDemoProps = {
  initial: {
    maxWidth: '640px',
    size: '48px',
    progressValue: 1,
    skeletonSize: 40,
    bannerText: 'Testmiljø',
  },
  changed: {
    maxWidth: '800px',
    size: '64px',
    progressValue: 3,
    skeletonSize: 60,
    bannerText: 'Endret testmiljø',
  },
} satisfies Record<string, CspDemoProps>;

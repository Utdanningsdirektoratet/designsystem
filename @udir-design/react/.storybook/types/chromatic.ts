/*
 * Chromatic doesn't provide its own typing. Hopefully we can remove this in the future.
 */

export type ChromaticViewport = {
  width?: number | `${string}px`;
  height?: number | `${string}px`;
};

export type ChromaticParameters = {
  /**
   * Configure Chromatic. See [the documentation](https://www.chromatic.com/docs/config-with-story-params/).
   */
  chromatic?: {
    /** Disable visual snapshots at the global, component or story level */
    disableSnapshot?: boolean;
    /**
     * By default, CSS animations are paused at the end of their animation cycle
     * when tests are run in Chromatic. Setting this to false will pause animations
     * at the first frame instead.
     */
    pauseAnimationAtEnd?: false;
    /** Delay in ms before running tests in Chromatic */
    delay?: number;
    /**
     * Allows you to fine-tune the threshold for visual change between snapshots before
     * Chromatic flags them. Must be a number from 0 to 1. 0 is the most accurate, while
     * 1 is the least accurate.
     *
     * @default 0.063
     */
    diffThreshold?: number;
    /**
     * Modes allow separate snapshots and baselines for a collection
     * of parameters like viewport size, theme etc.
     */
    modes?: Record<
      string,
      {
        /**
         * Disable a mode that has been enabled at a higher level.
         * E.g. disable a global mode for a specific story.
         **/
        disable?: true;
        /**
         * The viewport to use.
         *
         * This parameter can either be an object with height and/or width (in px), or
         * the name of one of the viewports configured in `parameters.viewports` in `.storybook/preview.tsx`
         */
        viewport?: ChromaticViewport | string;
        // ...any other globals from Storybook, addons or decorators which we want
        // to use in modes can also be added here
      }
    >;
  };
};

export default {
  plugins: [
    {
      name: 'preset-default',
      overrides: {
        removeViewBox: false,
      },
    },
    'removeDimensions',
    /**
     * Adds id='symbol' to the <svg> element, so that it can be
     * referenced with <svg><use href="path/to/icon.svg#symbol"></svg>
     */
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [{ id: 'symbol' }],
      },
    },
  ],
};

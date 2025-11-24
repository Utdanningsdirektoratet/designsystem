/**
This SVGO config only adds id='icon' to the <svg> element, so that it
can be referenced with
  <svg><use href="path/to/icon.svg#icon></svg>

Otherwise it does no optimizations. We assume that the .svg files from
@navikt/aksel-icons have already been optimized.
*/

export default {
  plugins: [
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [{ id: 'icon' }],
      },
    },
  ],
};

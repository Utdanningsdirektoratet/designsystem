/**
 * Tags the CSS in a story's `parameters.css`, so oxfmt formats it as CSS.
 *
 * Returns the CSS without the indentation and blank lines that oxfmt adds around the
 * template, so the docs can show it as it would look in a CSS file.
 */
export const css = (
  strings: TemplateStringsArray,
  ...values: unknown[]
): string => {
  // `String.raw` keeps backslash escapes such as `content: '\2014'` for the stylesheet,
  // instead of interpreting them as JavaScript escapes.
  const lines = String.raw(strings, ...values).split('\n');
  const indent = Math.min(
    ...lines.filter((line) => line.trim()).map((line) => line.search(/\S/)),
  );
  return lines
    .map((line) => line.slice(indent))
    .join('\n')
    .replace(/^\n+/, '')
    .trimEnd();
};

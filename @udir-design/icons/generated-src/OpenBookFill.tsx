import React, {
  forwardRef,
  useId,
  type Ref,
  type SVGAttributes,
  type SVGProps,
} from 'react';
interface SVGRProps {
  /**
   * @deprecated Use `aria-label` for an accessible name, and the `Tooltip` component from `@udir-design/react` for a tooltip. Will be removed in the next major version.
   */
  title?: string;
  /**
   * @deprecated Only used by the deprecated `title` prop. Will be removed in the next major version.
   */
  titleId?: string;
}
const SvgOpenBookFill = forwardRef<
  SVGSVGElement,
  SVGAttributes<SVGSVGElement> & SVGRProps
>(
  (
    { title, titleId: _titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
  ) => {
    let titleId: string | undefined = useId().replace(/:/g, '');
    titleId = title ? (_titleId ? _titleId : 'title-' + titleId) : undefined;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="none"
        viewBox="0 0 24 24"
        focusable={false}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="currentColor"
          d="M3.75 5.25A.25.25 0 0 1 4 5.5V17c0 .81.65 1.461 1.444 1.496H5.43l.018.002.024.001.02.001h1.095l.307.005a9.04 9.04 0 0 1 4.338 1.282q.068.04.137.07a.22.22 0 0 1 .132.194.2.2 0 0 1-.2.199H3a.75.75 0 0 1-.75-.75V6A.75.75 0 0 1 3 5.25zm17.25 0a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75h-8.3a.2.2 0 0 1-.2-.2c0-.084.054-.158.132-.192q.07-.03.14-.072a9.03 9.03 0 0 1 4.644-1.286h1.134l.048-.005.1-.01.053-.005.052-.01A1.5 1.5 0 0 0 20 17v-.03L20 16.955V5.5a.25.25 0 0 1 .25-.25zm-2.398-1.24c.227.047.399.249.399.49L19 4.512v12.475l.001.013a.5.5 0 0 1-.4.49l-.1.01h-1.085c-1.58 0-3.136.375-4.539 1.088a.26.26 0 0 1-.377-.227V5.313c0-.095.053-.182.139-.223A11 11 0 0 1 17.416 4h1.085zm-11.67-.004c1.538.048 3.047.42 4.43 1.084a.25.25 0 0 1 .138.223v13.046a.26.26 0 0 1-.377.227A10 10 0 0 0 6.586 17.5H5.51l-.015-.001A.5.5 0 0 1 5 17V4.5a.5.5 0 0 1 .5-.5h1.086z"
        />
      </svg>
    );
  },
);
export default SvgOpenBookFill;

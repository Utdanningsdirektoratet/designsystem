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
const SvgHandshakeFill = forwardRef<
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
          fillRule="evenodd"
          d="M13.737 3.177a1.75 1.75 0 0 0-2.474 0L5.97 8.47a.75.75 0 0 0 0 1.06l1.085 1.086a2.75 2.75 0 0 0 3.89 0L12 9.561l5.47 5.47c.14.14.331.22.53.22h3a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-5.69zM7.672 4.75a.25.25 0 0 1 .176.427L5.263 7.763a1.75 1.75 0 0 0 0 2.475l1.085 1.085a3.75 3.75 0 0 0 5.304 0l.171-.171a.25.25 0 0 1 .354 0l4.586 4.586A1.75 1.75 0 0 0 18 16.25h2.481c.09 0 .175.049.215.13.18.362.276.737.288 1.111a2.41 2.41 0 0 1-2.493 2.493c-.615-.02-1.233-.266-1.789-.74l-5.348-5.348a.5.5 0 0 0-.708.708l5.634 5.633a.03.03 0 0 1 0 .043 2.4 2.4 0 0 1-1.789.704c-.615-.02-1.233-.266-1.789-.739l-3.848-3.849a.5.5 0 0 0-.708.708l3.634 3.633a.03.03 0 0 1 0 .043 2.4 2.4 0 0 1-1.789.704c-.702-.023-1.408-.34-2.021-.954L2.44 15a.75.75 0 0 1-.191-.5v-9A.75.75 0 0 1 3 4.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHandshakeFill;

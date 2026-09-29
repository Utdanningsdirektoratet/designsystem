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
const SvgSquareroot = forwardRef<
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
          d="M8.272 4.818A.75.75 0 0 1 9 4.25h12a.75.75 0 0 1 0 1.5H9.586L6.228 19.182a.75.75 0 0 1-1.434.07l-2.5-7a.75.75 0 0 1 1.412-.504l1.667 4.667zm4.33 3.546a.75.75 0 0 1 1.034.239l1.864 2.982 1.864-2.982a.75.75 0 1 1 1.272.795L16.384 13l2.252 3.602a.75.75 0 1 1-1.272.796L15.5 14.415l-1.864 2.983a.75.75 0 1 1-1.272-.796L14.616 13l-2.252-3.602a.75.75 0 0 1 .238-1.034"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSquareroot;

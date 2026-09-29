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
const SvgCameraTriangle = forwardRef<
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
          d="M16.538 1.636a.75.75 0 0 0-1.312 0l-5 9a.75.75 0 0 0 .656 1.114h10a.75.75 0 0 0 .656-1.114zm-.656 1.908 3.725 6.706h-7.45zm-7.594.219A.75.75 0 0 1 9 3.25h2.25a.75.75 0 0 1 0 1.5H9.54l-.828 2.487A.75.75 0 0 1 8 7.75H4a.25.25 0 0 0-.25.25v10c0 .138.112.25.25.25h16a.25.25 0 0 0 .25-.25v-3.898a.75.75 0 1 1 1.5 0V18A1.75 1.75 0 0 1 20 19.75H4A1.75 1.75 0 0 1 2.25 18V8c0-.966.784-1.75 1.75-1.75h3.46zm.031 10.862A4.25 4.25 0 0 1 7.75 12.5a.75.75 0 1 1 1.5 0 2.75 2.75 0 0 0 5.235 1.179.75.75 0 1 1 1.355.642 4.25 4.25 0 0 1-7.52.304"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCameraTriangle;

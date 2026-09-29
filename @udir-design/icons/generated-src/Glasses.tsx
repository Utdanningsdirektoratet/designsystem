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
const SvgGlasses = forwardRef<
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
          d="M3.75 6a1.25 1.25 0 1 1 2.5 0v2a.75.75 0 0 0 1.5 0V6a2.75 2.75 0 0 0-5.5 0v12c0 .966.784 1.75 1.75 1.75h5.5A1.75 1.75 0 0 0 11.25 18v-4.25h1.5V18c0 .966.784 1.75 1.75 1.75H20A1.75 1.75 0 0 0 21.75 18V6a2.75 2.75 0 1 0-5.5 0v2a.75.75 0 0 0 1.5 0V6a1.25 1.25 0 1 1 2.5 0v6.25H3.75zM9.5 18.25a.25.25 0 0 0 .25-.25v-4.25h-6V18c0 .138.112.25.25.25zm10.5 0a.25.25 0 0 0 .25-.25v-4.25h-6V18c0 .138.112.25.25.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgGlasses;

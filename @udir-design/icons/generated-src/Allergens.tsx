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
const SvgAllergens = forwardRef<
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
          d="M14.75 3.55a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5h-.01a.75.75 0 0 1-.75-.75m-.5 4.95a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0m1.25-2.75a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5M7.25 15.5a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0m1.25-2.75a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5m-.75-2.2a.75.75 0 0 1 .75-.75h.01a.75.75 0 1 1 0 1.5H8.5a.75.75 0 0 1-.75-.75m-2.213 1.973a.75.75 0 1 0-1.06-1.06l-.007.007a.75.75 0 0 0 1.06 1.06zM3.55 14.74a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-1.5 0v-.01a.75.75 0 0 1 .75-.75m1.973 3.723a.75.75 0 0 0-1.06 1.06l.007.008a.75.75 0 1 0 1.06-1.061zM7.74 20.45a.75.75 0 0 1 .75-.75h.01a.75.75 0 1 1 0 1.5h-.01a.75.75 0 0 1-.75-.75m4.79-.92a.75.75 0 0 0-1.06-1.06l-.007.007a.75.75 0 1 0 1.06 1.06zm.92-4.78a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-1.5 0v-.01a.75.75 0 0 1 .75-.75m-1.956-2.197-.024-.022-.007-.007a.75.75 0 1 1 1.067-1.055l.007.007a.75.75 0 0 1-1.043 1.077m1.043-7.03a.75.75 0 1 0-1.06-1.06l-.007.007a.75.75 0 0 0 1.06 1.06zM10.55 7.74a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-1.5 0v-.01a.75.75 0 0 1 .75-.75m4.19 5.71a.75.75 0 0 1 .75-.75h.01a.75.75 0 1 1 0 1.5h-.01a.75.75 0 0 1-.75-.75m4.79-.92a.75.75 0 0 0-1.06-1.06l-.007.007a.75.75 0 1 0 1.06 1.06zm.92-4.78a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-1.5 0V8.5a.75.75 0 0 1 .75-.75m-.92-3.28a.75.75 0 1 0-1.06 1.06l.007.007a.75.75 0 0 0 1.06-1.06z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgAllergens;

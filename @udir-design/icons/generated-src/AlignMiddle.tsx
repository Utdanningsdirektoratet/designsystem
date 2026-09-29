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
const SvgAlignMiddle = forwardRef<
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
          d="M6 19.25a.75.75 0 0 1-.75-.75v-5.75H4a.75.75 0 0 1 0-1.5h1.25V5.5A.75.75 0 0 1 6 4.75h4a.75.75 0 0 1 .75.75v5.75h2.5V8.5a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 .75.75v2.75H20a.75.75 0 0 1 0 1.5h-1.25v2.75a.75.75 0 0 1-.75.75h-4a.75.75 0 0 1-.75-.75v-2.75h-2.5v5.75a.75.75 0 0 1-.75.75zm8.75-6.5v2h2.5v-2zm2.5-1.5v-2h-2.5v2zm-10.5 6.5v-5h2.5v5zm2.5-11.5v5h-2.5v-5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgAlignMiddle;

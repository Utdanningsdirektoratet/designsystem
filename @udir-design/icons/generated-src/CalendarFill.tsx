import {
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
const SvgCalendarFill = forwardRef<
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
          d="M9 2.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 9 2.25m6 0a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75M13.25 4.5a.25.25 0 0 0-.25-.25h-2a.25.25 0 0 0-.25.25V7a1.75 1.75 0 1 1-3.5 0V4.5A.25.25 0 0 0 7 4.25H4.5c-.69 0-1.25.56-1.25 1.25V9c0 .138.112.25.25.25h17a.25.25 0 0 0 .25-.25V5.5c0-.69-.56-1.25-1.25-1.25H17a.25.25 0 0 0-.25.25V7a1.75 1.75 0 1 1-3.5 0zm7.5 6.5a.25.25 0 0 0-.25-.25h-17a.25.25 0 0 0-.25.25v7.5c0 .69.56 1.25 1.25 1.25h15c.69 0 1.25-.56 1.25-1.25zm-14 2a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m4.75-.75a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5zm3.25.75a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m-3.25 2.25a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5zm3.25.75a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m-7.25-.75a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCalendarFill;

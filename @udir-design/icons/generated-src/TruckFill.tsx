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
const SvgTruckFill = forwardRef<
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
          d="M3.361 4.25c-.614 0-1.111.56-1.111 1.25v11c0 .69.497 1.25 1.111 1.25H3.5c.138 0 .25-.112.259-.25a3.5 3.5 0 0 1 6.982 0c.01.138.12.25.259.25h2.5c.138 0 .25-.112.259-.25.038-.541.2-1.048.456-1.494a.26.26 0 0 0 .035-.13V5.5c0-.69-.498-1.25-1.111-1.25zM21.75 16.5c0 .498-.291.928-.713 1.129-.142.068-.288-.05-.302-.207a3.5 3.5 0 0 0-4.619-2.984c-.174.06-.366-.063-.366-.247V7.5a.25.25 0 0 1 .25-.25h2.662c.51 0 .97.311 1.16.786l1.91 4.775a.3.3 0 0 1 .018.093zm-7 1.25a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0m-7.5-2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTruckFill;

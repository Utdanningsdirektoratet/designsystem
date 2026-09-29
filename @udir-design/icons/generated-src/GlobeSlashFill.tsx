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
const SvgGlobeSlashFill = forwardRef<
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
          d="M15.034 2.731a.242.242 0 0 0-.308.29l.007.03v.003c.35 1.502.616 2.944.799 4.354L13.189 9.75H9.977a.25.25 0 0 0-.25.233 33 33 0 0 0-.037 3.267l-2.5 2.5H3.371a.243.243 0 0 0-.224.343 9.8 9.8 0 0 0 1.448 2.25L3.47 19.47a.75.75 0 1 0 1.06 1.06l16-16a.75.75 0 0 0-1.06-1.06l-1.126 1.126a9.7 9.7 0 0 0-3.31-1.865m-2.197-.446a.25.25 0 0 1 .218.19l.218.92c.37 1.587.641 3.1.818 4.577a.25.25 0 0 1-.248.278h-3.686a.25.25 0 0 1-.247-.278 42 42 0 0 1 .817-4.576l.219-.921a.25.25 0 0 1 .217-.19 10 10 0 0 1 1.674 0m-3.738.404a.164.164 0 0 1 .207.196l-.039.166v.003a43 43 0 0 0-.874 4.973.25.25 0 0 1-.249.223H3.372a.243.243 0 0 1-.224-.343A9.78 9.78 0 0 1 9.1 2.689M2.71 9.75a.246.246 0 0 0-.242.193 9.8 9.8 0 0 0 0 4.114.246.246 0 0 0 .242.193h5.264a.25.25 0 0 0 .25-.266 35 35 0 0 1 0-3.968.25.25 0 0 0-.25-.266z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgGlobeSlashFill;

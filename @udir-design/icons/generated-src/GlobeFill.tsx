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
const SvgGlobeFill = forwardRef<
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
          d="M15.033 2.731a.242.242 0 0 0-.308.29l.008.033c.401 1.723.691 3.367.873 4.973a.25.25 0 0 0 .25.223h4.772c.178 0 .299-.182.224-.343a9.78 9.78 0 0 0-5.819-5.176m-2.197-.446a.25.25 0 0 1 .218.19l.219.92c.369 1.587.64 3.1.817 4.577a.25.25 0 0 1-.248.278h-3.685a.25.25 0 0 1-.247-.278c.176-1.477.448-2.99.817-4.577l.219-.92a.25.25 0 0 1 .217-.19 10 10 0 0 1 1.673 0m-3.87.446a.242.242 0 0 1 .308.29l-.007.03v.003a43 43 0 0 0-.874 4.973.25.25 0 0 1-.249.223H3.372a.243.243 0 0 1-.224-.343A9.78 9.78 0 0 1 8.966 2.73M2.71 9.75a.246.246 0 0 0-.242.193 9.8 9.8 0 0 0 0 4.114.246.246 0 0 0 .242.193h5.264a.25.25 0 0 0 .25-.266 35 35 0 0 1 0-3.968.25.25 0 0 0-.25-.266zm.663 6a.243.243 0 0 0-.224.343 9.78 9.78 0 0 0 5.82 5.176c.184.06.355-.11.305-.296l-.004-.014-.003-.013c-.4-1.716-.69-3.36-.873-4.973a.25.25 0 0 0-.25-.223zm7.606 5.785c.027.1.113.174.217.182a10 10 0 0 0 1.61 0 .25.25 0 0 0 .216-.182l.254-.941c.367-1.577.639-3.087.815-4.566a.25.25 0 0 0-.247-.278h-3.686a.25.25 0 0 0-.248.278c.177 1.48.449 2.989.815 4.566zm3.748-.562a.241.241 0 0 0 .306.296 9.78 9.78 0 0 0 5.82-5.176.243.243 0 0 0-.224-.343h-4.772a.25.25 0 0 0-.25.223 43 43 0 0 1-.873 4.973l-.003.013zm6.565-6.723c.116 0 .217-.08.242-.193a9.8 9.8 0 0 0 0-4.114.246.246 0 0 0-.242-.193h-5.264a.25.25 0 0 0-.25.266c.076 1.33.075 2.644 0 3.968a.25.25 0 0 0 .25.266zm-7.02-.233a.25.25 0 0 1-.248.233H9.976a.25.25 0 0 1-.248-.233 33 33 0 0 1 0-4.034.25.25 0 0 1 .249-.233h4.046c.132 0 .24.102.249.233a33 33 0 0 1 0 4.034"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgGlobeFill;

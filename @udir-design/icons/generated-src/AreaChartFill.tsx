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
const SvgAreaChartFill = forwardRef<
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
          d="M3.483 4.426A.75.75 0 0 0 2.25 5v10.197c0 .172.191.274.334.179l.024-.015 4.412-2.71a.75.75 0 0 1 .859.052l2.221 1.764a.25.25 0 0 0 .268.028l10.278-5.156.978-.56a.25.25 0 0 0 .126-.217V6a.75.75 0 0 0-1.067-.681l-10.287 4.735a.25.25 0 0 1-.265-.036zm18.267 6.44a.25.25 0 0 0-.374-.217l-.004.002-.036.02-10.866 5.45a.75.75 0 0 1-.803-.082l-2.173-1.726a.25.25 0 0 0-.286-.017l-3.804 2.336-1.043.695a.25.25 0 0 0-.111.208V19c0 .414.336.75.75.75h18a.75.75 0 0 0 .75-.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgAreaChartFill;

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
const SvgSkipForward = forwardRef<
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
          d="M20 6.25a.75.75 0 0 1 .75.75v10a.75.75 0 0 1-1.5 0V7a.75.75 0 0 1 .75-.75m-9.343.083a.75.75 0 0 1 .779.057l7 5a.75.75 0 0 1 0 1.22l-7 5A.75.75 0 0 1 10.25 17v-2a.75.75 0 0 1 1.5 0v.543L16.71 12l-4.96-3.543V9a.75.75 0 0 1-1.5 0V7a.75.75 0 0 1 .407-.667m-6.221.057A.75.75 0 0 0 3.25 7v10a.75.75 0 0 0 1.186.61l7-5a.75.75 0 0 0 0-1.22zM9.71 12l-4.96 3.543V8.457z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSkipForward;

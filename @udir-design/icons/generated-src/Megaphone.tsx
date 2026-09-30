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
const SvgMegaphone = forwardRef<
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
          d="M17.787 5.307A.75.75 0 0 1 18.25 6v12a.75.75 0 0 1-1.28.53l-.615-.614a7.25 7.25 0 0 0-4.1-2.05l-.005-.001V19a.75.75 0 0 1-.75.75h-2a.75.75 0 0 1-.75-.75v-3.325A3.751 3.751 0 0 1 9.5 8.25h1.567q.38 0 .755-.054l.432-.061a7.25 7.25 0 0 0 4.101-2.051l.615-.614a.75.75 0 0 1 .817-.163M9.5 14.25h1.25v-4.5H9.5a2.25 2.25 0 0 0 0 4.5m2.966.13-.216-.03v-4.7l.216-.03a8.75 8.75 0 0 0 4.284-1.874v8.508a8.75 8.75 0 0 0-4.284-1.874m-2.216 1.37v2.5h.5v-2.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMegaphone;

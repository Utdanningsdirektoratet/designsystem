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
const SvgPiggybank = forwardRef<
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
          d="M8.283 2.305A.75.75 0 0 0 7.25 3v2.156A7.9 7.9 0 0 0 5.053 7.75H3a.75.75 0 0 0-.75.75V14c0 .414.336.75.75.75h2.34c.702 1.126 1.707 2.072 2.91 2.761V20.5a.75.75 0 0 0 1.5 0v-2.302a9.7 9.7 0 0 0 3.25.552c1.14 0 2.24-.196 3.25-.555V20.5a.75.75 0 0 0 1.5 0v-2.992c2.387-1.365 4-3.737 4-6.508 0-4.371-4.015-7.75-8.75-7.75-.662 0-1.309.065-1.93.19zm.467 1.81 1.967.8a.75.75 0 0 0 .448.037A8.4 8.4 0 0 1 13 4.75c4.101 0 7.25 2.89 7.25 6.25s-3.149 6.25-7.25 6.25c-2.943 0-5.43-1.508-6.571-3.608a.75.75 0 0 0-.66-.392H3.75v-4h1.775a.75.75 0 0 0 .688-.45c.452-1.035 1.22-1.951 2.218-2.65.2-.141.319-.37.319-.615zm1.585 4.556c1.79-.895 3.54-.895 5.33 0a.75.75 0 1 0 .67-1.342c-2.21-1.105-4.46-1.105-6.67 0a.75.75 0 0 0 .67 1.342"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPiggybank;

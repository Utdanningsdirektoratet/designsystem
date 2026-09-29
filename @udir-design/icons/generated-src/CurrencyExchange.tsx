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
const SvgCurrencyExchange = forwardRef<
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
          d="M8.269 2.992A9.75 9.75 0 0 1 21.749 12a.75.75 0 0 1-1.5 0A8.25 8.25 0 0 0 4.856 7.875a.75.75 0 0 1-1.4-.375V3a.75.75 0 1 1 1.5 0v2.259A9.75 9.75 0 0 1 8.27 2.992m3.2 6.3a.75.75 0 0 0-1.2-.9l-1.808 2.41v-1.96a.75.75 0 1 0-1.5 0v6.316a.75.75 0 0 0 1.5 0v-1.96l1.807 2.41a.75.75 0 1 0 1.2-.9L9.439 12zm1.018-.45a.75.75 0 0 1 .75-.75h1.973a2.329 2.329 0 0 1 1.081 4.393l1.17 2.337a.75.75 0 1 1-1.342.671l-1.372-2.743h-.76v2.408a.75.75 0 1 1-1.5 0zm2.735 2.408h-1.235V9.592h1.223a.829.829 0 0 1 .012 1.658M3.75 12a.75.75 0 0 0-1.5 0 9.75 9.75 0 0 0 16.794 6.741V21a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-1.4-.375A8.25 8.25 0 0 1 3.75 12"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCurrencyExchange;

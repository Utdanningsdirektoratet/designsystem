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
const SvgPaperclip = forwardRef<
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
          d="M15.912 4.382c-.546.032-1.086.292-1.503.71l-8.132 8.131c-1.2 1.201-1.754 3.549 0 5.304 1.755 1.754 4.103 1.2 5.304 0l7.424-7.425a.75.75 0 0 1 1.06 1.06l-7.424 7.425c-1.627 1.628-4.936 2.488-7.424 0s-1.628-5.797 0-7.424l8.131-8.132c.644-.643 1.518-1.09 2.475-1.146.976-.058 1.978.295 2.829 1.146.85.851 1.203 1.853 1.146 2.828-.056.957-.503 1.832-1.146 2.475l-7.425 7.425c-.316.316-.838.553-1.376.613-.568.063-1.255-.062-1.806-.613-.55-.55-.676-1.238-.613-1.806.06-.538.297-1.06.613-1.376l6.718-6.718a.75.75 0 0 1 1.06 1.061l-6.717 6.718a.95.95 0 0 0-.183.48c-.025.227.026.424.183.58.156.157.353.208.58.183a.95.95 0 0 0 .48-.183l7.425-7.424c.417-.418.678-.957.71-1.503.03-.527-.147-1.116-.71-1.68s-1.152-.74-1.68-.71"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPaperclip;

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
const SvgBucketMop = forwardRef<
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
          d="M17.75 4a.75.75 0 0 0-1.5 0v12.25H14a.75.75 0 0 0-.369 1.403l-.827 2.069a.75.75 0 0 0 .696 1.028h7a.75.75 0 0 0 .696-1.029l-.827-2.068A.75.75 0 0 0 20 16.25h-2.25zm-2.554 13.779.011-.029h3.586l.01.029.59 1.471h-4.785zm-3.543-4.082a.75.75 0 0 0-.03-.48c-.143-.35-.423-.595-.683-.76a3.9 3.9 0 0 0-.941-.415c-.695-.213-1.568-.333-2.499-.333-.93 0-1.804.12-2.498.333a3.9 3.9 0 0 0-.942.415c-.26.165-.54.41-.683.76a.75.75 0 0 0-.03.478q0 .045.008.092l.902 6.32a.76.76 0 0 0 .528.612l.055.017q.07.023.195.06c.165.05.396.116.66.182.51.127 1.21.272 1.805.272s1.294-.145 1.805-.272a15 15 0 0 0 .855-.242l.055-.017.015-.005.004-.002h.002a.75.75 0 0 0 .506-.606l.903-6.319a1 1 0 0 0 .008-.09m-5.961-.104a4 4 0 0 1-.327-.093l.076-.024c.524-.16 1.245-.267 2.06-.267.813 0 1.534.106 2.058.267l.076.024a4 4 0 0 1-.327.093 7.7 7.7 0 0 1-1.808.198 7.7 7.7 0 0 1-1.808-.198m-.653 1.377.636 4.45q.171.049.383.102c.49.123 1.041.228 1.442.228.4 0 .951-.105 1.442-.228q.212-.053.383-.102l.636-4.45a6 6 0 0 1-.294.08 9.2 9.2 0 0 1-2.167.241 9.2 9.2 0 0 1-2.167-.241 6 6 0 0 1-.294-.08"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBucketMop;

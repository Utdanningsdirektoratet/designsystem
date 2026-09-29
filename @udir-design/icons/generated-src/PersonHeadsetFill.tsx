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
const SvgPersonHeadsetFill = forwardRef<
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
          d="M7.091 6.75a.24.24 0 0 1-.24-.284A5.252 5.252 0 0 1 17.25 7.5a5.25 5.25 0 0 1-8.463 4.152c-.177-.137-.073-.402.151-.402H10.5a2.25 2.25 0 0 0 0-4.5H7.091m.136 9.477A6.75 6.75 0 0 1 18.75 21a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 1.977-4.773M5 5.75a.75.75 0 0 1 .75.75v1.75h4.75a.75.75 0 0 1 0 1.5H5A.75.75 0 0 1 4.25 9V6.5A.75.75 0 0 1 5 5.75m14.75.75a.75.75 0 0 0-1.5 0v2a.75.75 0 0 0 1.5 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPersonHeadsetFill;

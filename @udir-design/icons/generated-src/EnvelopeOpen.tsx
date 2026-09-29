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
const SvgEnvelopeOpen = forwardRef<
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
          d="M12.364 2.344a.75.75 0 0 0-.728 0l-9 5A.75.75 0 0 0 2.25 8v11c0 .414.336.75.75.75h18a.75.75 0 0 0 .75-.75V8a.75.75 0 0 0-.386-.656zM3.75 17.19l5.088-5.088L3.75 9.275zM4.544 8l5.85 3.25h3.212L19.456 8 12 3.858zm10.618 4.102 5.088 5.087V9.275zm4.027 6.148-5.5-5.5h-3.378l-5.5 5.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgEnvelopeOpen;

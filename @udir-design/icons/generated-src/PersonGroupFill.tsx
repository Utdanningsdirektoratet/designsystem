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
const SvgPersonGroupFill = forwardRef<
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
          d="M3.75 7.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0m.477 8.727A6.75 6.75 0 0 1 15.75 21a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 1.977-4.773m13.037 3.023a.255.255 0 0 1-.247-.196 8.25 8.25 0 0 0-4.302-5.42.28.28 0 0 1-.026-.48A6.74 6.74 0 0 0 15.75 7.5c0-.836-.152-1.636-.43-2.375-.065-.173.065-.362.248-.337a4.25 4.25 0 0 1 .978 8.172 5.75 5.75 0 0 1 4.204 5.54.75.75 0 0 1-.75.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPersonGroupFill;

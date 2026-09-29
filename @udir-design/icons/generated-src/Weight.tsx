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
const SvgWeight = forwardRef<
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
          d="M7 6.75a.75.75 0 0 1 .75.75v3.75h8.5V7.5a.75.75 0 0 1 1.5 0v9a.75.75 0 0 1-1.5 0v-3.75h-8.5v3.75a.75.75 0 0 1-1.5 0v-9A.75.75 0 0 1 7 6.75M19.75 9a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-1.25zM5 8.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-2.25H3a.75.75 0 0 1 0-1.5h1.25V9A.75.75 0 0 1 5 8.25"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgWeight;

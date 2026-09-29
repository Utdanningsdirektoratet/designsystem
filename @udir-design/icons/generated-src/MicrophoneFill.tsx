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
const SvgMicrophoneFill = forwardRef<
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
          d="M12 2.75A3.75 3.75 0 0 0 8.25 6.5v5a3.75 3.75 0 1 0 7.5 0v-5A3.75 3.75 0 0 0 12 2.75M7.75 10.5a.75.75 0 0 0-1.5 0v1c0 2.889 2.13 5.28 4.905 5.688v2.562h-1.25a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5h-1.25v-2.537A5.75 5.75 0 0 0 17.75 11.5v-1a.75.75 0 0 0-1.5 0v1a4.25 4.25 0 0 1-8.5 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMicrophoneFill;

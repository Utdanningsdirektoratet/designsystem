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
const SvgCpuFill = forwardRef<
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
          d="M12 2.25a.75.75 0 0 1 .75.75v2h1.5V3a.75.75 0 0 1 1.5 0v2H17a2 2 0 0 1 2 2v1.25h2a.75.75 0 0 1 0 1.5h-2v1.5h2a.75.75 0 0 1 0 1.5h-2v1.5h2a.75.75 0 0 1 0 1.5h-2V17a2 2 0 0 1-2 2h-1.25v2a.75.75 0 0 1-1.5 0v-2h-1.5v2a.75.75 0 0 1-1.5 0v-2h-1.5v2a.75.75 0 0 1-1.5 0v-2H7a2 2 0 0 1-2-2v-1.25H3a.75.75 0 0 1 0-1.5h2v-1.5H3a.75.75 0 0 1 0-1.5h2v-1.5H3a.75.75 0 0 1 0-1.5h2V7a2 2 0 0 1 2-2h1.25V3a.75.75 0 0 1 1.5 0v2h1.5V3a.75.75 0 0 1 .75-.75m-4 5a.75.75 0 0 0-.75.75v8c0 .414.336.75.75.75h8a.75.75 0 0 0 .75-.75V8a.75.75 0 0 0-.75-.75zm.75 8v-6.5h6.5v6.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCpuFill;

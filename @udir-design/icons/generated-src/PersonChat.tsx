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
const SvgPersonChat = forwardRef<
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
          d="M15.75 10.19V5.75h5.5v3.5H17a.75.75 0 0 0-.53.22zm-.25-5.94c-.69 0-1.25.56-1.25 1.25V12a.75.75 0 0 0 1.28.53l1.78-1.78h4.19c.69 0 1.25-.56 1.25-1.25v-4c0-.69-.56-1.25-1.25-1.25zm-7 2a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5M4.25 9a4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-8.5 0m4.25 6.75a3.75 3.75 0 0 0-3.727 3.333.75.75 0 1 1-1.49-.166 5.25 5.25 0 0 1 10.435 0 .75.75 0 0 1-1.491.166A3.75 3.75 0 0 0 8.5 15.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPersonChat;

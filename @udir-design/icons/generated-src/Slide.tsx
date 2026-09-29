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
const SvgSlide = forwardRef<
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
          d="M20 3.75c.966 0 1.75.784 1.75 1.75v14a.75.75 0 0 1-1.5 0v-1.25h-3.5v1.25a.75.75 0 0 1-1.5 0v-3.169a19.1 19.1 0 0 1-4.348 3.802 1 1 0 0 1-.098.052l-.023.01q-.033.01-.067.02-.042.013-.085.022l-.012.002a1 1 0 0 1-.117.011h-8l-.005-.001h-.009a.8.8 0 0 1-.276-.058.75.75 0 0 1-.37-.336l-.031-.063-.004-.01a.75.75 0 0 1-.055-.281.75.75 0 0 1 .438-.683l.028-.012a19.34 19.34 0 0 0 10.98-11.764l.054-.165V5.5a1.75 1.75 0 1 1 3.5 0v.75h1.5V5.5c0-.966.784-1.75 1.75-1.75m-5.463 4a20.83 20.83 0 0 1-8.896 11h4.636a17.6 17.6 0 0 0 7.073-9.172l.609-1.828zm2.213 9h3.5v-2h-3.5zm1.58-5.5a19 19 0 0 1-.96 2h2.88v-2zm.544-1.5h1.376v-2h-.709zM15 5.25a.25.25 0 0 0-.25.25v.75h.5V5.5a.25.25 0 0 0-.25-.25m5 0a.25.25 0 0 0-.25.25v.75h.5V5.5a.25.25 0 0 0-.25-.25"
        />
      </svg>
    );
  },
);
export default SvgSlide;

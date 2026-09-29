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
const SvgChangingRoomFill = forwardRef<
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
          d="M9.5 3.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5M6 7.75a.75.75 0 0 0-.72.538l-2.5 8.5a.75.75 0 0 0 .72.962h1.75v2.75a.75.75 0 0 0 1.5 0v-2.75h1.5v2.75a.75.75 0 0 0 1.5 0v-2.75h1.75a.75.75 0 0 0 .72-.962l-1.63-5.538h1.91a.75.75 0 0 0 0-1.5h-2.428a3.75 3.75 0 0 0-3.317-2zm8 7.5a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5zm3-4a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-.75.75h-2a.75.75 0 0 1-.711-.513l-.33-.987H13.5a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 .711.513l.33.987h.709V12a.75.75 0 0 1 .75-.75m2.5 1a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgChangingRoomFill;

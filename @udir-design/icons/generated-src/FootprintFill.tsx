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
const SvgFootprintFill = forwardRef<
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
          d="M5.579 6.872a3.1 3.1 0 0 1 3.598-.014c1.545 1.093 2.43 2.996 1.79 4.97l-.56 1.729c-.435 1.337-.426 2.713-.158 4.154a3.129 3.129 0 1 1-6.187.241l.154-1.445a4.5 4.5 0 0 0-.136-1.658l-.578-2.104a5.45 5.45 0 0 1 2.077-5.873m9.306-4.014a3.1 3.1 0 0 1 3.597.014 5.45 5.45 0 0 1 2.077 5.873l-.578 2.104a4.5 4.5 0 0 0-.135 1.658L20 13.952a3.13 3.13 0 1 1-6.188-.241c.269-1.441.277-2.817-.157-4.154l-.56-1.73c-.64-1.973.244-3.876 1.79-4.969"
        />
      </svg>
    );
  },
);
export default SvgFootprintFill;

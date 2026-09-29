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
const SvgTheme = forwardRef<
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
          d="M12 18.75a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75m-5.834-1.977a.751.751 0 0 1 1.062 1.061l-1.415 1.414a.75.75 0 0 1-1.061-1.06zm10.607 0a.75.75 0 0 1 1.061 0l1.414 1.415a.75.75 0 0 1-1.06 1.06l-1.415-1.414a.75.75 0 0 1 0-1.06M12 6.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5m-.516 1.535a3.75 3.75 0 0 0 .024 7.432c.54-1.385.787-2.613.784-3.717-.003-1.12-.261-2.168-.808-3.715M4.5 11.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5zm17 0a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5zM4.752 4.752a.75.75 0 0 1 1.061 0l1.415 1.414a.75.75 0 0 1-1.061 1.06L4.752 5.814a.75.75 0 0 1 0-1.061m13.435 0a.751.751 0 0 1 1.061 1.06l-1.415 1.415a.75.75 0 1 1-1.06-1.061zM12 1.75a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75"
        />
      </svg>
    );
  },
);
export default SvgTheme;

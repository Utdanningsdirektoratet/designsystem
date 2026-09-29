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
const SvgRefrigerator = forwardRef<
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
          d="M5.25 3A.75.75 0 0 1 6 2.25h12a.75.75 0 0 1 .75.75v18a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75zM8 14.25a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 8 9.75H6.75v-6h10.5v16.5H6.75v-6zm-.75-3h-.5v1.5h.5zm6.28-6.28L13 4.44l-.53.53a9 9 0 0 0-1.027 1.235c-.321.47-.693 1.136-.693 1.795a2.25 2.25 0 0 0 4.5 0c0-.66-.372-1.324-.693-1.795A9 9 0 0 0 13.53 4.97M12.25 8c0-.17.128-.504.432-.951.1-.148.21-.292.318-.426.108.134.217.278.318.426.304.447.432.782.432.951a.75.75 0 0 1-1.5 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgRefrigerator;

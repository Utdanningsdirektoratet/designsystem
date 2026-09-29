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
const SvgBellSlashFill = forwardRef<
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
          d="M17.826 9.854a.243.243 0 0 1 .418.164q.006.243.006.482v3c0 .809.424 1.92.921 2.915a18 18 0 0 0 .876 1.55l.058.09.015.023.004.006a.75.75 0 0 1-.624 1.166h-4.338a3.25 3.25 0 0 1-6.324 0 .168.168 0 0 1-.12-.287zm.448-4.689a.75.75 0 0 1 1.061 1.06L5.03 20.53a.75.75 0 0 1-1.06-1.06zM10.42 19.25a1.75 1.75 0 0 0 1.581 1 1.75 1.75 0 0 0 1.581-1zM12 1.75a.75.75 0 0 1 .75.75v1.272c1.435.091 2.54.45 3.37 1.034.122.085.132.26.026.365L5.877 15.44c-.202.201-.56-.053-.46-.32.197-.528.333-1.075.333-1.621v-3c0-1.501.114-3.21 1.001-4.541.844-1.266 2.277-2.046 4.5-2.187V2.5a.75.75 0 0 1 .75-.75"
        />
      </svg>
    );
  },
);
export default SvgBellSlashFill;

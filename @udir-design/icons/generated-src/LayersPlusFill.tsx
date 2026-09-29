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
const SvgLayersPlusFill = forwardRef<
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
          d="M11.575 4.382a.75.75 0 0 1 .85 0l8 5.5a.75.75 0 0 1 0 1.236l-8 5.5a.75.75 0 0 1-.85 0l-8-5.5a.75.75 0 0 1 0-1.236zM12.75 8.5a.75.75 0 0 0-1.5 0v1.25H9.5a.75.75 0 0 0 0 1.5h1.75v1.25a.75.75 0 0 0 1.5 0v-1.25h1.75a.75.75 0 0 0 0-1.5h-1.75zm-8.325 4.382a.75.75 0 1 0-.85 1.236l8 5.5a.75.75 0 0 0 .85 0l8-5.5a.75.75 0 1 0-.85-1.236L12 18.09z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgLayersPlusFill;

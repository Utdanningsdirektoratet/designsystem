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
const SvgBuildings3Fill = forwardRef<
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
          d="M7 2.25a.75.75 0 0 0-.75.75v18c0 .414.336.75.75.75h10a.75.75 0 0 0 .75-.75V3a.75.75 0 0 0-.75-.75zm3.75 4.25a.75.75 0 0 0-1.5 0v2a.75.75 0 0 0 1.5 0zM13 5.75a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75m-2.25 6.75a.75.75 0 0 0-1.5 0v2a.75.75 0 0 0 1.5 0zm2.25-.75a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75m-8.5-2.5a.25.25 0 0 1 .25.25v12a.25.25 0 0 1-.25.25H3a.75.75 0 0 1-.75-.75V10A.75.75 0 0 1 3 9.25zm15 12.5a.25.25 0 0 1-.25-.25v-12a.25.25 0 0 1 .25-.25H21a.75.75 0 0 1 .75.75v11a.75.75 0 0 1-.75.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBuildings3Fill;

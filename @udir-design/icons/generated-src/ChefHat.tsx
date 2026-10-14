import {
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
const SvgChefHat = forwardRef<
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
          d="M12 3.75c-1.346 0-2.5.629-3.294 1.589l-.514-.334a3.75 3.75 0 0 0-4.085 6.29l1.357.88.79 7.9A.75.75 0 0 0 7 20.75h10a.75.75 0 0 0 .746-.675l.792-7.915 1.331-.865a3.75 3.75 0 1 0-4.084-6.29l-.507.329C14.485 4.4 13.384 3.75 12 3.75M9.55 6.74c.542-.922 1.43-1.49 2.45-1.49 1.027 0 1.86.561 2.466 1.502a.75.75 0 0 0 1.039.223l1.097-.712a2.25 2.25 0 1 1 2.45 3.774l-1.633 1.061a.75.75 0 0 0-.338.554l-.76 7.598H7.68l-.759-7.582a.75.75 0 0 0-.337-.554l-1.659-1.077a2.25 2.25 0 1 1 2.451-3.774l1.12.727a.75.75 0 0 0 1.055-.25M9 10.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgChefHat;

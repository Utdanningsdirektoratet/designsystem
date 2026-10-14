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
const SvgHourglass = forwardRef<
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
          d="M6 3.25a.75.75 0 0 0 0 1.5h.315c.109 1.966.642 3.846 1.546 5.302.502.81 1.116 1.479 1.81 1.948-.694.47-1.308 1.138-1.81 1.948-.904 1.456-1.437 3.336-1.546 5.302H6a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5h-.298c-.109-1.966-.643-3.846-1.546-5.302-.503-.81-1.116-1.479-1.81-1.948.694-.47 1.307-1.138 1.81-1.948.904-1.456 1.437-3.336 1.546-5.302H18a.75.75 0 0 0 0-1.5zm6.008 8c.972 0 2.027-.624 2.873-1.989.738-1.189 1.211-2.785 1.318-4.511H7.818c.107 1.726.58 3.322 1.318 4.511.846 1.365 1.901 1.989 2.872 1.989m0 1.5c-.971 0-2.026.624-2.872 1.989-.738 1.189-1.211 2.784-1.318 4.511h8.381c-.107-1.727-.58-3.322-1.318-4.511-.846-1.365-1.901-1.989-2.873-1.989"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHourglass;

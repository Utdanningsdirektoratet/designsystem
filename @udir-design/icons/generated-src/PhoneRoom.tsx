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
const SvgPhoneRoom = forwardRef<
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
          d="M5.203 4.772a1.27 1.27 0 0 1 1.798 0l3.48 3.483a1.273 1.273 0 0 1 0 1.799l-1.47 1.471 3.82 3.823 1.471-1.471a1.27 1.27 0 0 1 1.798 0l3.13 3.132a1.273 1.273 0 0 1 0 1.8l-2.458 2.46a2.49 2.49 0 0 1-2.934.439l-2.474-1.318a19.1 19.1 0 0 1-8.017-8.148l-1.072-2.094a2.5 2.5 0 0 1 .455-2.901zM3.81 8.327a.97.97 0 0 0-.177 1.125l1.072 2.094a17.56 17.56 0 0 0 7.376 7.496l2.474 1.317c.375.2.838.131 1.139-.17l2.278-2.28-2.77-2.772-1.83 1.83a.76.76 0 0 1-1.079 0l-4.9-4.902a.764.764 0 0 1 0-1.08l1.83-1.83-3.12-3.123zm8.71-6.296c2.678-.198 5.233.543 7.07 2.381s2.578 4.396 2.38 7.075a.763.763 0 0 1-1.521-.113c.172-2.334-.478-4.421-1.937-5.882s-3.546-2.111-5.878-1.938a.763.763 0 0 1-.113-1.523m1.125 3.957c1.22-.018 2.26.495 3.068 1.303s1.321 1.85 1.303 3.071a.764.764 0 0 1-1.527-.022c.012-.743-.29-1.403-.855-1.969s-1.224-.868-1.967-.856a.763.763 0 0 1-.022-1.527"
        />
      </svg>
    );
  },
);
export default SvgPhoneRoom;

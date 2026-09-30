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
const SvgPackageFill = forwardRef<
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
          d="M12.375 2.35a.75.75 0 0 0-.75 0L4.58 6.418a.25.25 0 0 0 0 .433l7.295 4.21a.25.25 0 0 0 .25 0l7.294-4.21.023-.013a.23.23 0 0 0 .007-.403zm8.169 6.017a.25.25 0 0 0-.367-.22l-.02.01-7.282 4.204a.25.25 0 0 0-.125.216V21a.25.25 0 0 0 .375.216l7.044-4.067a.75.75 0 0 0 .375-.649zm-9.669 12.85A.25.25 0 0 0 11.25 21v-8.422a.25.25 0 0 0-.125-.217l-7.294-4.21a.25.25 0 0 0-.375.216V16.5a.75.75 0 0 0 .375.65z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPackageFill;

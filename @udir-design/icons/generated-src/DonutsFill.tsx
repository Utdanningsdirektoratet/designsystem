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
const SvgDonutsFill = forwardRef<
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
          d="M4.687 6.684c-2.203 2.203-2.96 4.062-2.96 5.568A4.1 4.1 0 0 0 2.92 15.17l1.414 1.415a4.1 4.1 0 0 0 2.917 1.192c1.507 0 3.365-.757 5.569-2.96 2.202-2.203 2.96-4.062 2.96-5.569a4.1 4.1 0 0 0-1.193-2.916l-1.414-1.415a4.1 4.1 0 0 0-2.917-1.192c-1.506 0-3.365.757-5.568 2.96m8.502 3.162a.75.75 0 0 0-1.377-.596c-.403.931-.992 1.907-1.822 2.737a.75.75 0 0 0 1.06 1.06c.993-.992 1.678-2.138 2.138-3.201M10.025 7.78c.508.508-.03 1.87-1.202 3.04-1.171 1.172-2.533 1.71-3.04 1.203-.508-.508.03-1.87 1.202-3.04 1.171-1.172 2.533-1.71 3.04-1.203m1.356 10.638c-.213-.052-.245-.334-.06-.451.754-.477 1.527-1.09 2.315-1.852.116-.112.309-.086.442.005.12.082.265.13.422.13 1.403 0 2.699-.326 3.776-.753a.75.75 0 0 0-.552-1.394c-.67.265-1.424.48-2.224.582-.217.028-.347-.223-.213-.396q.527-.682.908-1.345a.26.26 0 0 1 .144-.117c.706-.238 1.16-.61 1.16-1.027 0-.219-.124-.425-.344-.606a.28.28 0 0 1-.1-.288q.224-.847.223-1.659c0-.509-.064-.973-.17-1.394-.045-.184.11-.362.296-.321 1.445.318 2.446.882 3.126 1.563A4.1 4.1 0 0 1 21.75 12v2a4.1 4.1 0 0 1-1.22 2.905c-1.065 1.066-2.915 1.845-6.03 1.845-1.226 0-2.256-.12-3.12-.332"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgDonutsFill;

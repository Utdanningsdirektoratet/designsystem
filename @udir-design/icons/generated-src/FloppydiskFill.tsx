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
const SvgFloppydiskFill = forwardRef<
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
          d="M4 3.25h2.75a.5.5 0 0 1 .5.5V7c0 .414.336.75.75.75h8a.75.75 0 0 0 .75-.75V3.75a.5.5 0 0 1 .5-.5H18a.75.75 0 0 1 .53.22l2 2c.141.14.22.331.22.53v14a.75.75 0 0 1-.75.75h-1.75a.5.5 0 0 1-.5-.5V11a.75.75 0 0 0-.75-.75H7a.75.75 0 0 0-.75.75v9.25a.5.5 0 0 1-.5.5H4a.75.75 0 0 1-.75-.75V4A.75.75 0 0 1 4 3.25m12.25 17a.5.5 0 0 1-.5.5h-7.5a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h7.5a.5.5 0 0 1 .5.5zm-7.5-16.5a.5.5 0 0 1 .5-.5h5.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-5.5a.5.5 0 0 1-.5-.5zM9.25 14a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFloppydiskFill;

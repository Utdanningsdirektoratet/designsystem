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
const SvgToothFill = forwardRef<
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
          d="M5.186 4.506a4.29 4.29 0 0 1 3.826-1.51l1.061.132a6.8 6.8 0 0 1 1.927.54 6.8 6.8 0 0 1 1.927-.54l1.061-.132a4.288 4.288 0 0 1 4.6 5.611l-1.078 3.234a4.75 4.75 0 0 1-1.147 1.857l-.135.134-.384 5.387a2.187 2.187 0 0 1-4.32.302L12 17.079l-.523 2.442a2.187 2.187 0 0 1-4.32-.302l-.385-5.387-.134-.134A4.75 4.75 0 0 1 5.49 11.84L4.412 8.607a4.29 4.29 0 0 1 .774-4.101"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgToothFill;

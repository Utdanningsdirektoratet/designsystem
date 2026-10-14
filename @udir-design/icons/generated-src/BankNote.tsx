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
const SvgBankNote = forwardRef<
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
          d="M3 5.25a.75.75 0 0 0-.75.75v12c0 .414.336.75.75.75h18a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75zm.75 4.425A3.75 3.75 0 0 0 6.675 6.75h10.65a3.76 3.76 0 0 0 2.925 2.925v4.65a3.76 3.76 0 0 0-2.925 2.925H6.675a3.76 3.76 0 0 0-2.925-2.925zM5.122 6.75A2.26 2.26 0 0 1 3.75 8.122V6.75zm0 10.5a2.26 2.26 0 0 0-1.372-1.372v1.372zm13.756 0a2.26 2.26 0 0 1 1.372-1.372v1.372zm0-10.5c.226.64.733 1.146 1.372 1.372V6.75zM10.25 12c0-1.376.906-2.25 1.75-2.25s1.75.874 1.75 2.25c0 1.377-.906 2.25-1.75 2.25s-1.75-.873-1.75-2.25M12 8.25c-1.917 0-3.25 1.813-3.25 3.75s1.333 3.75 3.25 3.75 3.25-1.813 3.25-3.75S13.917 8.25 12 8.25"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBankNote;

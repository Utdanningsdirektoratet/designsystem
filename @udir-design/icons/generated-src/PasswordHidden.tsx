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
const SvgPasswordHidden = forwardRef<
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
          d="M4.149 12.5a.75.75 0 0 0 1.5 0v-.7l.607.35a.75.75 0 0 0 .75-1.3l-.607-.35.607-.35a.75.75 0 1 0-.75-1.3l-.607.35v-.7a.75.75 0 0 0-1.5 0v.701l-.607-.35a.75.75 0 0 0-.75 1.298l.607.35-.607.351a.75.75 0 1 0 .75 1.3l.607-.351zM3 15.25a.75.75 0 0 0 0 1.5h18a.75.75 0 0 0 0-1.5zm9-2a.75.75 0 0 1-.75-.75v-.701l-.607.35a.75.75 0 0 1-.75-1.298l.607-.351-.607-.35a.75.75 0 1 1 .75-1.3l.607.35v-.7a.75.75 0 0 1 1.5 0v.7l.607-.35a.75.75 0 1 1 .75 1.3l-.607.35.607.35a.75.75 0 1 1-.75 1.3l-.607-.351v.701a.75.75 0 0 1-.75.75m6.351-.75a.75.75 0 0 0 1.5 0v-.701l.608.35a.75.75 0 0 0 .75-1.298L20.6 10.5l.607-.35a.75.75 0 0 0-.75-1.3l-.607.35v-.7a.75.75 0 0 0-1.5 0v.7l-.607-.35a.75.75 0 1 0-.75 1.3l.607.35-.607.35a.75.75 0 1 0 .75 1.3l.607-.351z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPasswordHidden;

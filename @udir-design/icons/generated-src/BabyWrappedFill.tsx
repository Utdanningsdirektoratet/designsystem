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
const SvgBabyWrappedFill = forwardRef<
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
          d="M7.75 8a4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-8.5 0M12 2.25A5.75 5.75 0 0 0 6.25 8v4.632a.25.25 0 0 0 .138.224l.962.48 4.118 2.288a.25.25 0 0 0 .26-.01l4.853-3.236 1.06-.72a.25.25 0 0 0 .109-.207V8A5.75 5.75 0 0 0 12 2.25M6.25 14.868a.25.25 0 0 1 .362-.224l.038.02 3.188 1.77a.25.25 0 0 1 .018.427l-2.661 1.775a.24.24 0 0 1-.352-.09A5.7 5.7 0 0 1 6.25 16zm1.826 5.335a.24.24 0 0 1 .036-.376l9.304-6.203a.214.214 0 0 1 .334.177V16a5.75 5.75 0 0 1-9.674 4.203M9.75 8a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5h-.01A.75.75 0 0 1 9.75 8m3.75-.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBabyWrappedFill;

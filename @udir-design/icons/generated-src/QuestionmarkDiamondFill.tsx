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
const SvgQuestionmarkDiamondFill = forwardRef<
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
          d="M1.57 12.53a.75.75 0 0 1 0-1.06l9.9-9.9a.75.75 0 0 1 1.06 0l9.9 9.9a.75.75 0 0 1 0 1.06l-9.9 9.9a.75.75 0 0 1-1.06 0zm9.179-2.632c0-.43.14-.729.33-.92.19-.19.49-.33.92-.33s.73.14.92.33c.19.191.33.49.33.92 0 .083-.033.206-.173.402-.144.202-.347.407-.607.668l-.02.02c-.236.236-.524.523-.748.837-.235.329-.452.756-.452 1.273v.4a.75.75 0 0 0 1.5 0v-.4c0-.082.033-.205.173-.401.144-.203.347-.408.607-.668l.02-.02c.236-.236.524-.524.748-.837.235-.33.452-.756.452-1.274 0-.77-.26-1.47-.77-1.98s-1.21-.77-1.98-.77-1.47.26-1.98.77-.77 1.21-.77 1.98a.75.75 0 0 0 1.5 0m1.25 5.054a.95.95 0 1 0 0 1.9.95.95 0 0 0 0-1.9"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgQuestionmarkDiamondFill;

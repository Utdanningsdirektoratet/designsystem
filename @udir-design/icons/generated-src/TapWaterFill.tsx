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
const SvgTapWaterFill = forwardRef<
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
          d="M13.5 2.25A3.75 3.75 0 0 0 9.75 6v.5a.75.75 0 0 0 1.5 0V6a2.25 2.25 0 0 1 2.25-2.25H15A2.25 2.25 0 0 1 17.25 6v15a.75.75 0 0 0 1.5 0V6A3.75 3.75 0 0 0 15 2.25zm-3 5.69.53.53a9 9 0 0 1 1.027 1.235c.321.47.693 1.136.693 1.795a2.25 2.25 0 1 1-4.5 0c0-.66.372-1.324.693-1.795A9 9 0 0 1 9.97 8.47zM5.932 9.252a.75.75 0 0 1 .815.68l.53 5.838.588.44a2.05 2.05 0 0 0 2.367.066 3.55 3.55 0 0 1 3.468-.264l.553-6.08a.75.75 0 0 1 1.494.135l-.917 10.09a1.75 1.75 0 0 1-1.743 1.592H7.913a1.75 1.75 0 0 1-1.743-1.591l-.917-10.091a.75.75 0 0 1 .68-.815"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTapWaterFill;

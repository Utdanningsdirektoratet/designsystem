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
const SvgStarOfLife = forwardRef<
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
          d="M9.75 3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v5.103l4.419-2.552a.75.75 0 0 1 1.024.275l1.5 2.598a.75.75 0 0 1-.274 1.025L16.499 12l4.42 2.551a.75.75 0 0 1 .274 1.025l-1.5 2.598a.75.75 0 0 1-1.024.275l-4.42-2.552V21a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-5.103L5.332 18.45a.75.75 0 0 1-1.025-.275l-1.5-2.598a.75.75 0 0 1 .275-1.025L7.5 12 3.08 9.449a.75.75 0 0 1-.274-1.025l1.5-2.598a.75.75 0 0 1 1.025-.275L9.75 8.103zm1.5.75v5.652a.75.75 0 0 1-1.125.65L5.23 7.224l-.75 1.3 4.895 2.826a.75.75 0 0 1 0 1.298L4.48 15.477l.75 1.298 4.895-2.825a.75.75 0 0 1 1.125.65v5.651h1.5v-5.652a.75.75 0 0 1 1.125-.65l4.895 2.826.75-1.299-4.895-2.825a.75.75 0 0 1 0-1.3l4.895-2.825-.75-1.3-4.895 2.826a.75.75 0 0 1-1.125-.65V3.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgStarOfLife;

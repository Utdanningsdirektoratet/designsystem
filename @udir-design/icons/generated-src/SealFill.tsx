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
const SvgSealFill = forwardRef<
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
          d="M9.99 3.051a2.75 2.75 0 0 1 4.019 0l.788.844c.247.264.595.408.956.396l1.154-.04a2.75 2.75 0 0 1 2.841 2.842l-.039 1.154c-.012.36.132.71.396.955l.844.789a2.75 2.75 0 0 1 0 4.018l-.844.789a1.25 1.25 0 0 0-.396.955l.04 1.154a2.75 2.75 0 0 1-2.842 2.841l-1.154-.039a1.25 1.25 0 0 0-.956.396l-.788.844a2.75 2.75 0 0 1-4.018 0l-.789-.844a1.25 1.25 0 0 0-.955-.396l-1.154.04a2.75 2.75 0 0 1-2.841-2.842l.039-1.154a1.25 1.25 0 0 0-.396-.955l-.844-.789a2.75 2.75 0 0 1 0-4.018l.844-.789a1.25 1.25 0 0 0 .396-.955l-.04-1.154a2.75 2.75 0 0 1 2.842-2.841l1.154.039c.36.012.709-.132.955-.396z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSealFill;

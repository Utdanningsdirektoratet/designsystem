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
const SvgChildHairEyesFill = forwardRef<
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
          d="M14.737 4.51a2.47 2.47 0 0 0 .02-1.622 6.25 6.25 0 1 1-4.435-.412v.001c1.658-.373 2.52-.055 2.918.305.399.362.474.89.324 1.296-.225.61-1.19 1.035-2.13.22a.625.625 0 0 0-.82.943c1.457 1.264 3.532.87 4.122-.73M10.5 8.749a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm2.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5h-.01a.75.75 0 0 1-.75-.75m-.75 6.25a5.25 5.25 0 0 0-5.25 5.25.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75 5.25 5.25 0 0 0-5.25-5.25"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgChildHairEyesFill;

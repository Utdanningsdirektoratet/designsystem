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
const SvgWateringCanFill = forwardRef<
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
          d="M9.77 6.22c-.025.226-.031.42-.03.566-.303.314-.49.742-.49 1.214v1.543l-1.13-.807a.25.25 0 0 0-.322.026l-2.46 2.46a.25.25 0 0 0-.015.337l3.927 4.713V19.5c0 .69.56 1.25 1.25 1.25h9c.69 0 1.25-.56 1.25-1.25V11c0-.716-.158-1.394-.441-2.003.061-.167.139-.397.212-.67.153-.57.299-1.366.226-2.205-.074-.847-.376-1.77-1.15-2.514-.769-.74-1.92-1.221-3.535-1.355-1.589-.133-2.815.06-3.755.475-.95.419-1.566 1.046-1.953 1.704A4.55 4.55 0 0 0 9.77 6.22m9.483.032c.036.418-.003.84-.074 1.219A4.73 4.73 0 0 0 16 6.25h-4.72c.049-.319.154-.697.366-1.057.238-.405.622-.809 1.266-1.093.653-.288 1.615-.47 3.026-.353 1.386.116 2.171.51 2.62.942.445.428.643.973.695 1.563m-14.82-.246a1.25 1.25 0 0 1 2.045.42l.378.944a.25.25 0 0 1-.056.27L4.14 10.3a.25.25 0 0 1-.27.056l-.944-.378a1.25 1.25 0 0 1-.42-2.044z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgWateringCanFill;

import React, {
  forwardRef,
  useId,
  type Ref,
  type SVGAttributes,
  type SVGProps,
} from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgMedicalThermometerFill = forwardRef<
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
          d="M18.237 3.177a1.75 1.75 0 0 0-2.474 0L8.348 10.59a3.75 3.75 0 0 0-1.098 2.652v2.446l-1.28 1.28a.75.75 0 1 0 1.06 1.061l1.28-1.28h2.447a3.75 3.75 0 0 0 2.652-1.098l7.414-7.414a1.75 1.75 0 0 0 0-2.475zM17.03 8.03a.75.75 0 0 0-1.06-1.06l-3 3a.75.75 0 1 0 1.06 1.06zm-12 12a.75.75 0 1 0-1.06-1.06l-1 1a.75.75 0 1 0 1.06 1.06z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMedicalThermometerFill;

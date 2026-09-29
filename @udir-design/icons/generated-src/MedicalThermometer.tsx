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
const SvgMedicalThermometer = forwardRef<
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
          d="M15.763 3.177a1.75 1.75 0 0 1 2.474 0l2.586 2.586a1.75 1.75 0 0 1 0 2.474l-7.414 7.415a3.75 3.75 0 0 1-2.652 1.098H8.311l-1.28 1.28a.75.75 0 0 1-1.061-1.06l1.28-1.28v-2.447a3.75 3.75 0 0 1 1.098-2.652zm1.414 1.06a.25.25 0 0 0-.354 0L9.41 11.652a2.25 2.25 0 0 0-.659 1.59v2.008h2.007a2.25 2.25 0 0 0 1.591-.659l7.415-7.414a.25.25 0 0 0 0-.354zM17.03 6.97a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l3-3a.75.75 0 0 1 1.06 0m-12 12a.75.75 0 0 1 0 1.06l-1 1a.75.75 0 0 1-1.06-1.06l1-1a.75.75 0 0 1 1.06 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMedicalThermometer;

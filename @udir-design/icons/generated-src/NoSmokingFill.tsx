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
const SvgNoSmokingFill = forwardRef<
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
          d="M18.25 2.5a.75.75 0 0 0-1.5 0v.882c0 .97.548 1.855 1.415 2.289.358.18.585.546.585.947V7.5a.75.75 0 0 0 1.5 0v-.882c0-.97-.548-1.855-1.415-2.289a1.06 1.06 0 0 1-.585-.947zM7.03 6.47a.75.75 0 0 0-1.06 1.06l10 10a.75.75 0 1 0 1.06-1.06zM3 9.25a.75.75 0 0 0-.75.75v4c0 .414.336.75.75.75h6.5a.75.75 0 0 0 .53-1.28l-4-4a.75.75 0 0 0-.53-.22zm14.25.25a.25.25 0 0 0-.25-.25h-3a.75.75 0 0 0-.53 1.28l3.353 3.354a.25.25 0 0 0 .427-.177zm1.5 5c0 .138.112.25.25.25h1A1.75 1.75 0 0 0 21.75 13v-2A1.75 1.75 0 0 0 20 9.25h-1a.25.25 0 0 0-.25.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgNoSmokingFill;

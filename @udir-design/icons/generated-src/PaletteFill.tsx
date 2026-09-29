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
const SvgPaletteFill = forwardRef<
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
          d="M3.146 12c0-5.385 4.366-9.75 9.75-9.75 1.802 0 3.257.373 4.478 1.164 1.214.787 2.128 1.942 2.928 3.385q.02.037.037.075c.603 1.448 1.065 4.135-.971 6.015-.74.682-1.676 1.024-2.352 1.27l-.282.105c-.378.144-.603.252-.735.36-.09.073-.103.111-.103.188 0 .217.048.333.093.403.048.076.13.155.28.243.156.09.352.17.607.264l.144.052c.21.076.453.164.681.266.86.382 1.279 1.32 1.202 2.23-.08.95-.674 1.9-1.817 2.535l-.045.023a9.7 9.7 0 0 1-4.145.922c-5.384 0-9.75-4.365-9.75-9.75m11.916-2.61a1.5 1.5 0 1 1 2.898.777 1.5 1.5 0 0 1-2.898-.777M7.818 7.45a1.5 1.5 0 1 1 2.898.776 1.5 1.5 0 0 1-2.898-.777m4.27-1.445a1.5 1.5 0 1 1 2.897.776 1.5 1.5 0 0 1-2.898-.776"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPaletteFill;

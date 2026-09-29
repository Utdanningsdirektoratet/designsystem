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
const SvgEnvelopeClosedFill = forwardRef<
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
          d="M2.592 7.63a.224.224 0 0 0-.342.19v9.661a.5.5 0 0 0 .854.354l5.487-5.487a.5.5 0 0 0-.077-.77zm1.571 11.266a.5.5 0 0 0 .354.854H19.48a.5.5 0 0 0 .354-.854l-5.842-5.841a.5.5 0 0 0-.63-.062l-.948.631a.75.75 0 0 1-.832 0l-.947-.632a.5.5 0 0 0-.631.063zm16.733-1.06a.5.5 0 0 0 .854-.353V7.821a.225.225 0 0 0-.344-.19l-5.922 3.947a.5.5 0 0 0-.076.77zm.414-11.915c.213-.133.3-.425.087-.558A.75.75 0 0 0 21 5.25H3a.75.75 0 0 0-.398.114c-.213.134-.126.425.087.558l.708.442.018.012 8.307 5.538a.5.5 0 0 0 .554 0l8.307-5.538.019-.012z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgEnvelopeClosedFill;

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
const SvgEyeFill = forwardRef<
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
          d="m21.597 11.54-.119-.179c-.103-.15-.255-.36-.455-.61-.4-.5-.997-1.164-1.793-1.827C17.637 7.596 15.223 6.25 12 6.25c-3.222 0-5.637 1.346-7.23 2.674a13 13 0 0 0-1.793 1.826 11 11 0 0 0-.573.79l-.047.074a.77.77 0 0 0 .047.846q.041.066.118.179c.103.15.255.36.455.61.4.5.997 1.164 1.793 1.827C6.363 16.404 8.778 17.75 12 17.75s5.637-1.346 7.23-2.674a13 13 0 0 0 1.793-1.826 10 10 0 0 0 .574-.79l.046-.074a.75.75 0 0 0 0-.772zM9.25 12a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0M12 7.75a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgEyeFill;

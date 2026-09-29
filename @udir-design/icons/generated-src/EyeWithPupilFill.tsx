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
const SvgEyeWithPupilFill = forwardRef<
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
          d="M21.478 11.361a7 7 0 0 1 .165.252.75.75 0 0 1 0 .773l-.046.075-.119.178c-.103.15-.255.36-.455.61-.4.5-.997 1.164-1.793 1.827-1.593 1.328-4.007 2.674-7.23 2.674-3.222 0-5.637-1.346-7.23-2.674a13 13 0 0 1-1.793-1.826 10 10 0 0 1-.606-.84.77.77 0 0 1-.014-.796l.047-.074q.041-.065.118-.179c.103-.15.255-.36.455-.61.4-.5.997-1.164 1.793-1.827C6.363 7.596 8.778 6.25 12 6.25s5.637 1.346 7.23 2.674a13 13 0 0 1 1.793 1.826c.2.25.352.46.455.611M12 9.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5M7.75 12a4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-8.5 0M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgEyeWithPupilFill;

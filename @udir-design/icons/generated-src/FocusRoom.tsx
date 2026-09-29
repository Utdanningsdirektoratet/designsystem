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
const SvgFocusRoom = forwardRef<
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
          d="M6.72 10.25c.397 0 .72.336.72.75v4c0 .138.107.25.24.25h2.4c.928 0 1.68.784 1.68 1.75v4c0 .414-.322.75-.72.75s-.72-.336-.72-.75v-4a.245.245 0 0 0-.24-.25h-2.4C6.752 16.75 6 15.966 6 15v-4c0-.414.322-.75.72-.75m12 1c.397 0 .72.336.72.75s-.323.75-.72.75h-2.64V21c0 .414-.322.75-.72.75s-.72-.336-.72-.75v-8.25h-3.12c-.398 0-.72-.336-.72-.75s.322-.75.72-.75zm-.146-5.622a.706.706 0 0 1 .984-.28.77.77 0 0 1 .267 1.024l-2.127 3.878H13.92c-.398 0-.72-.336-.72-.75s.322-.75.72-.75h2.942zM6.72 3C8.31 3 9.6 4.343 9.6 6S8.31 9 6.72 9 3.84 7.657 3.84 6s1.29-3 2.88-3m0 1.5c-.795 0-1.44.672-1.44 1.5s.645 1.5 1.44 1.5S8.16 6.828 8.16 6s-.645-1.5-1.44-1.5"
        />
      </svg>
    );
  },
);
export default SvgFocusRoom;

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
const SvgMegaphoneFill = forwardRef<
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
          d="M18.25 6a.75.75 0 0 0-1.28-.53l-.615.614a7.3 7.3 0 0 1-3.891 2.017.256.256 0 0 0-.214.25v7.297c0 .124.091.23.214.25a7.26 7.26 0 0 1 3.891 2.018l.615.614a.75.75 0 0 0 1.28-.53zm-12.5 6a3.75 3.75 0 0 0 3.75 3.75h1a.25.25 0 0 0 .25-.25v-7a.25.25 0 0 0-.25-.25h-1A3.75 3.75 0 0 0 5.75 12m3 4.984c0-.154.137-.27.29-.256q.228.022.46.022h1.567q.308 0 .614.044l.432.061a.16.16 0 0 1 .137.16V19a.75.75 0 0 1-.75.75h-2a.75.75 0 0 1-.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMegaphoneFill;

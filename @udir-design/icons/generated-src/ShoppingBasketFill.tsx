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
const SvgShoppingBasketFill = forwardRef<
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
          d="M6 3.25a.75.75 0 0 0-.75.75v4.25H4a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h16a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-1.25V4a.75.75 0 0 0-.75-.75zm11.25 5v-3.5H6.75v3.5zm-12.504 5.5a.25.25 0 0 0-.248.281l.758 6.062A.75.75 0 0 0 6 20.75h12a.75.75 0 0 0 .744-.657l.758-6.062a.25.25 0 0 0-.248-.281zm7.254 1a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75m-2.41.68a.75.75 0 0 0-1.493.157l.314 2.983a.75.75 0 0 0 1.492-.157zm5.645-.668a.75.75 0 0 1 .668.825l-.314 2.983a.75.75 0 0 1-1.492-.157l.314-2.983a.75.75 0 0 1 .824-.668"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgShoppingBasketFill;

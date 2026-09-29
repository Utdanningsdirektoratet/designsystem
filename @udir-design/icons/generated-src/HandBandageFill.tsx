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
const SvgHandBandageFill = forwardRef<
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
          d="M10.75 3.792a.542.542 0 0 1 1.082-.036l.38 5.69-1.462-.069zm-1.616 5.51-.62-4.03a.583.583 0 0 0-1.156.154c.044.399.089 2.168.123 3.8zm-3.14.637c-.035-1.844-.086-3.98-.127-4.348A2.083 2.083 0 0 1 9.25 3.743a2.042 2.042 0 0 1 4.067-.203 2.059 2.059 0 0 1 3.432 1.533v.242a2.066 2.066 0 0 1 2.908 2.098l-.332 3.156-.002.018-.341 3.242-12.065-2.104-.894-.155.014.81-.1.417-.018-.022a1.645 1.645 0 0 0-2.285-.223.05.05 0 0 0-.005.07l1.86 2.03.382-1.586.788.136h.002l12.163 2.122-.08.755a.8.8 0 0 1-.049.2l-.35.875-.035.003-11.45 1.211-1.525-1.664-.277-.305v.002l-2.535-2.765a1.55 1.55 0 0 1 .174-2.255 3.15 3.15 0 0 1 3.316-.385zm11.914-.23.258-2.453a.566.566 0 1 0-1.126-.115l-.252 2.516zm-2.658-.123V5.073a.559.559 0 0 0-1.115-.043l-.345 4.488zm-8 10.25 10.5-1.111V21a.75.75 0 0 1-.75.75H8a.75.75 0 0 1-.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHandBandageFill;

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
const SvgEarFill = forwardRef<
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
          d="M12.979 2.269C9.706 1.765 6.706 3.804 5.817 6.8c-.384 1.294.02 2.607.328 3.611.224.725.407 1.517.407 2.121s-.183 1.396-.407 2.121l-.018.06c-.302.98-.715 2.316-.234 3.59a5.328 5.328 0 0 0 10.094-.376l2.196-7.467c1.101-3.743-1.348-7.598-5.204-8.191m-.362 3.607a3.417 3.417 0 0 0-4.065 3.355v1.77c0 .413.336.75.75.75a1.25 1.25 0 1 1 0 2.5.75.75 0 0 0 0 1.5 2.75 2.75 0 0 0 .75-5.397V9.23a1.917 1.917 0 1 1 3.767.506l-.292 1.065a.75.75 0 0 0 1.447.396l.291-1.065a3.417 3.417 0 0 0-2.648-4.257"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgEarFill;

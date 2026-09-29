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
const SvgLightning = forwardRef<
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
          d="M14.32 2.322a.75.75 0 0 1 .405.871l-1.638 6.143 4.483.417a.75.75 0 0 1 .54 1.183l-7.5 10.5a.75.75 0 0 1-1.335-.63l1.638-6.142-4.483-.417a.75.75 0 0 1-.54-1.183l7.5-10.5a.75.75 0 0 1 .93-.242M7.869 12.874l4.067.38a.75.75 0 0 1 .656.94l-.804 3.013 4.343-6.081-4.067-.38a.75.75 0 0 1-.655-.94l.803-3.013z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgLightning;

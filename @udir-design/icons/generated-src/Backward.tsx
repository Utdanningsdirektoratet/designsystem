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
const SvgBackward = forwardRef<
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
          d="M12.75 7a.75.75 0 0 0-1.114-.656l-9 5a.75.75 0 0 0 0 1.312l9 5A.75.75 0 0 0 12.75 17v-1.5a.75.75 0 0 0-1.5 0v.225L4.544 12l6.706-3.725V8.5a.75.75 0 0 0 1.5 0zm7 0a.75.75 0 0 0-1.114-.656l-9 5a.75.75 0 0 0 0 1.312l9 5A.75.75 0 0 0 19.75 17zm-1.5 8.725L11.544 12l6.706-3.725z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBackward;

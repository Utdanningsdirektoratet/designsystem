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
const SvgCircleSlashFill = forwardRef<
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
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75a9.72 9.72 0 0 0 6.878-2.84l-.004.005.041-.042-.004.004A9.72 9.72 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75m6.179 14.867a.245.245 0 0 1 .013.335q-.347.393-.74.739a.245.245 0 0 1-.334-.013L5.822 6.882a.245.245 0 0 1-.013-.335 8 8 0 0 1 .739-.739.245.245 0 0 1 .334.013z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCircleSlashFill;

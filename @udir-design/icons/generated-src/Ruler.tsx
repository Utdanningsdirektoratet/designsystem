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
const SvgRuler = forwardRef<
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
          d="M8.392 3.47a.75.75 0 0 0-1.06 0L4.25 6.55a1.853 1.853 0 0 0 0 2.622L14.827 19.75a1.853 1.853 0 0 0 2.621 0l3.082-3.082a.75.75 0 0 0 0-1.06zM5.311 7.612l2.551-2.551 2.25 2.25-.021.02-1.104 1.104a.75.75 0 0 0 1.06 1.06l1.104-1.103.021-.021 1.699 1.698-.022.021-1.104 1.104a.75.75 0 0 0 1.061 1.06l1.104-1.103.02-.022 1.7 1.699-.023.021-1.103 1.104a.75.75 0 0 0 1.06 1.06l1.104-1.103.021-.022 2.25 2.25-2.551 2.551a.354.354 0 0 1-.5 0L5.311 8.112a.353.353 0 0 1 0-.5"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgRuler;

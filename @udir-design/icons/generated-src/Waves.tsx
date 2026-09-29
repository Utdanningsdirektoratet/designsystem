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
const SvgWaves = forwardRef<
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
          d="M7.105 7.997a2.25 2.25 0 0 1 1.552.17L10.323 9a3.75 3.75 0 0 0 3.354 0l1.666-.833c.48-.24 1.03-.3 1.552-.17l2.923.73a.75.75 0 0 0 .364-1.455l-2.923-.73a3.75 3.75 0 0 0-2.587.283l-1.666.833a2.25 2.25 0 0 1-2.012 0l-1.666-.833a3.75 3.75 0 0 0-2.587-.283l-2.923.73a.75.75 0 0 0 .364 1.456zm1.552 4.17a2.25 2.25 0 0 0-1.552-.17l-2.923.73a.75.75 0 0 1-.364-1.455l2.923-.73a3.75 3.75 0 0 1 2.587.284l1.666.832a2.25 2.25 0 0 0 2.012 0l1.666-.832a3.75 3.75 0 0 1 2.587-.284l2.923.73a.75.75 0 0 1-.364 1.456l-2.923-.731a2.25 2.25 0 0 0-1.552.17L13.677 13a3.75 3.75 0 0 1-3.354 0zm0 4a2.25 2.25 0 0 0-1.552-.17l-2.923.73a.75.75 0 0 1-.364-1.455l2.923-.73a3.75 3.75 0 0 1 2.587.284l1.666.832a2.25 2.25 0 0 0 2.012 0l1.666-.832a3.75 3.75 0 0 1 2.587-.284l2.923.73a.75.75 0 0 1-.364 1.456l-2.923-.731a2.25 2.25 0 0 0-1.552.17L13.677 17a3.75 3.75 0 0 1-3.354 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgWaves;

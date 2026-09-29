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
const SvgFileParagraph = forwardRef<
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
          d="M5.25 4.5c0-.69.56-1.25 1.25-1.25H14a.75.75 0 0 1 .53.22l4 4c.141.14.22.331.22.53v11.5c0 .69-.56 1.25-1.25 1.25h-11c-.69 0-1.25-.56-1.25-1.25zm9.25 4.25c-.69 0-1.25-.56-1.25-1.25V4.75h-6.5v14.5h10.5V8.75zm.25-2.94 1.44 1.44h-1.44zm-4.784 5.216a2.027 2.027 0 0 1 3.488-1.405.75.75 0 0 1-1.08 1.041.526.526 0 1 0-.583.85l1.911.786a1.833 1.833 0 0 1 .238 3.272q.08.276.082.572a2.027 2.027 0 0 1-3.988.518.75.75 0 0 1 1.45-.385.527.527 0 1 0 .713-.62l-1.911-.786a1.833 1.833 0 0 1-.238-3.272 2 2 0 0 1-.082-.571m.89 2.456 1.791.737.027.01.218.078a.333.333 0 0 0 .24-.622l-1.792-.737-.026-.009-.218-.078a.333.333 0 0 0-.24.621"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFileParagraph;

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
const SvgCamera = forwardRef<
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
          d="M9 3.25a.75.75 0 0 0-.712.513L7.46 6.25H4A1.75 1.75 0 0 0 2.25 8v10c0 .966.784 1.75 1.75 1.75h16A1.75 1.75 0 0 0 21.75 18V8A1.75 1.75 0 0 0 20 6.25h-3.46l-.828-2.487A.75.75 0 0 0 15 3.25zm-.288 3.987L9.54 4.75h4.918l.83 2.487A.75.75 0 0 0 16 7.75h4a.25.25 0 0 1 .25.25v10a.25.25 0 0 1-.25.25H4a.25.25 0 0 1-.25-.25V8A.25.25 0 0 1 4 7.75h4a.75.75 0 0 0 .712-.513M9.25 12.5a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0M12 8.25a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCamera;

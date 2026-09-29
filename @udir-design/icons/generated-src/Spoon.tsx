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
const SvgSpoon = forwardRef<
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
          d="M12.75 11.666a2.5 2.5 0 0 0 .872-.388c.442-.31.733-.734.916-1.181.354-.865.338-1.891.204-2.705-.13-1.035-.369-2.006-.759-2.743C13.596 3.917 12.957 3.25 12 3.25c-.97 0-1.605.7-1.985 1.428-.387.741-.626 1.71-.757 2.712-.134.814-.15 1.841.204 2.707.183.447.474.871.916 1.181q.388.271.872.388V20a.75.75 0 0 0 1.5 0zm-2.006-4.07c.12-.925.328-1.702.6-2.224.282-.539.522-.622.656-.622.147 0 .384.083.658.6.27.51.478 1.283.598 2.243l.002.015.002.015c.114.684.096 1.4-.11 1.906-.099.24-.23.41-.39.521-.155.11-.39.2-.76.2s-.605-.09-.76-.2a1.14 1.14 0 0 1-.39-.521c-.206-.506-.224-1.222-.11-1.906l.002-.013z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSpoon;

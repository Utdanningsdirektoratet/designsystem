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
const SvgArmchairFill = forwardRef<
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
          d="M6.955 9.456a.49.49 0 0 1 .48.5v2.702c0 .442.344.8.768.8h7.578c.424 0 .769-.358.769-.8V9.956c0-.276.214-.5.48-.5h2.89a.49.49 0 0 1 .481.5v6.104c0 .883-.687 1.6-1.536 1.6h-2.039l.645 2.014a.76.76 0 0 1-.455.949.715.715 0 0 1-.912-.475l-.796-2.488H8.667l-.796 2.488a.715.715 0 0 1-.911.475.76.76 0 0 1-.456-.95l.644-2.013h-2.03c-.85 0-1.518-.717-1.518-1.6V9.956c0-.276.215-.5.48-.5zm8.872-6.116c.53 0 .96.498.96 1.05v3.225c0 .194-.15.352-.337.352-.745 0-1.348.628-1.348 1.404v2.083c0 .276-.216.5-.48.5H9.367a.49.49 0 0 1-.48-.5v-2.07c0-.783-.61-1.417-1.36-1.417a.35.35 0 0 1-.34-.355V4.39c0-.552.43-1.05.96-1.05z"
        />
      </svg>
    );
  },
);
export default SvgArmchairFill;

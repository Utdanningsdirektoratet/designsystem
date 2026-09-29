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
const SvgPersonChatFill = forwardRef<
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
          d="M15.5 4.25c-.69 0-1.25.56-1.25 1.25V12a.75.75 0 0 0 1.28.53l1.78-1.78h4.19c.69 0 1.25-.56 1.25-1.25v-4c0-.69-.56-1.25-1.25-1.25zM4.25 9a4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-8.5 0m.538 6.788a5.25 5.25 0 0 1 8.93 3.129.75.75 0 0 1-.746.833H4.028a.75.75 0 0 1-.746-.833 5.25 5.25 0 0 1 1.506-3.13"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPersonChatFill;

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
const SvgShieldLock = forwardRef<
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
          d="M19.75 4.02a.766.766 0 0 0-.927-.75l-.366.08a30.8 30.8 0 0 1-12.914 0l-.367-.08a.766.766 0 0 0-.926.75V13a7.75 7.75 0 0 0 15.5 0zm-14 .903c4.127.814 8.373.814 12.5 0V13a6.25 6.25 0 1 1-12.5 0zm4 4.577a2.25 2.25 0 1 1 4.5 0v.75h.25c.69 0 1.25.56 1.25 1.25V15a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v-3.5c0-.69.56-1.25 1.25-1.25h.25zm3 0v.75h-1.5V9.5a.75.75 0 0 1 1.5 0m-3 2.25v2.5h4.5v-2.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgShieldLock;

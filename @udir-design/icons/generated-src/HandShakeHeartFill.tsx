import {
  forwardRef,
  useId,
  type Ref,
  type SVGAttributes,
  type SVGProps,
} from 'react';
interface SVGRProps {
  /**
   * @deprecated Use `aria-label` for an accessible name, and the `Tooltip` component from `@udir-design/react` for a tooltip. Will be removed in the next major version.
   */
  title?: string;
  /**
   * @deprecated Only used by the deprecated `title` prop. Will be removed in the next major version.
   */
  titleId?: string;
}
const SvgHandShakeHeartFill = forwardRef<
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
          d="m14.652 12.092 2.828 2.828c.334.335.763.574 1.224.695.178.047.274.253.154.393q-.066.075-.14.15c-.419.418-.887.642-1.367.707l-.114.013a.304.304 0 0 0-.275.275l-.012.113c-.065.48-.29.949-.707 1.367-.418.418-.887.642-1.367.707q-.057.008-.114.012a.3.3 0 0 0-.275.275l-.012.114c-.065.48-.29.949-.707 1.367-.418.418-.887.642-1.367.707a2.46 2.46 0 0 1-1.227-.164 3.5 3.5 0 0 1-1.118-.72l-6.365-6.364-.07-.076-.002-.003-.132-.155a8 8 0 0 1-.417-.559 7.8 7.8 0 0 1-.98-1.98c-.264-.827-.405-1.812-.198-2.87.208-1.065.759-2.155 1.8-3.196 1.04-1.04 2.13-1.592 3.195-1.8 1.058-.206 2.043-.066 2.87.2.5.16.948.368 1.329.578a.02.02 0 0 1 .002.033 7 7 0 0 0-.24.201l-.002.002c-.05.046-.12.111-.19.196L7.12 9.38a1.75 1.75 0 0 0 .107 2.358l1.06 1.06a3.75 3.75 0 0 0 5.304 0l.707-.706a.25.25 0 0 1 .354 0m5.656-6.364c-2.097-2.098-4.351-2.112-6.04-1.58a8 8 0 0 0-1.99.962 8 8 0 0 0-.765.577 1 1 0 0 0-.09.091l-3.535 4.243a.75.75 0 0 0 .046 1.01l1.06 1.06a2.75 2.75 0 0 0 3.89 0l1.59-1.59 3.713 3.712c.671.671 1.86.703 2.467-.193.517-.763 1.217-2.023 1.397-3.503.186-1.52-.184-3.23-1.743-4.79"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHandShakeHeartFill;

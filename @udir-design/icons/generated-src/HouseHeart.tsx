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
const SvgHouseHeart = forwardRef<
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
          d="M12.53 2.47a.75.75 0 0 0-1.06 0l-7 7a.75.75 0 0 0-.22.53v11c0 .414.336.75.75.75h14a.75.75 0 0 0 .75-.75V10a.75.75 0 0 0-.22-.53zM5.75 20.25v-9.94L12 4.06l6.25 6.25v9.94zm4.28-7.22c.26-.26.68-.26.94 0l.5.5a.75.75 0 0 0 1.06 0l.5-.5a.664.664 0 1 1 .94.94L12 15.94l-1.97-1.97a.664.664 0 0 1 0-.94M12 11.94a2.164 2.164 0 0 0-3.03 3.09l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5A2.164 2.164 0 0 0 12 11.94"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHouseHeart;

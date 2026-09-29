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
const SvgLifebuoy = forwardRef<
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
          d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m2.073 14.549a4.98 4.98 0 0 1-4.147 0l-2.57 2.57A8.46 8.46 0 0 0 12 20.5c1.714 0 3.308-.51 4.643-1.382zm-8.257 1.28q.172.183.355.354l2.475-2.475a5 5 0 0 1-.354-.354zm9.891-2.476a5 5 0 0 1-.354.355l2.475 2.475q.183-.172.355-.354zM4.882 7.357A8.46 8.46 0 0 0 3.5 12c0 1.714.51 3.308 1.382 4.643l2.568-2.569A5 5 0 0 1 7 12c0-.74.162-1.442.45-2.074zm11.667 2.569A5 5 0 0 1 17 12c0 .74-.163 1.442-.451 2.074l2.568 2.569A8.46 8.46 0 0 0 20.5 12c0-1.714-.51-3.308-1.383-4.644zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7m3.354-.208q.185.168.353.354l2.476-2.476a9 9 0 0 0-.354-.354zM5.816 6.17l2.476 2.475q.168-.186.354-.354L6.17 5.816q-.183.172-.355.354M12 3.5a8.46 8.46 0 0 0-4.644 1.38l2.57 2.57A5 5 0 0 1 12 7c.74 0 1.442.162 2.074.45l2.569-2.568A8.46 8.46 0 0 0 12 3.5"
        />
      </svg>
    );
  },
);
export default SvgLifebuoy;

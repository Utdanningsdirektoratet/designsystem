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
const SvgHddUpFill = forwardRef<
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
          d="M4 3.25a.75.75 0 0 0-.75.75v8.5a.75.75 0 0 0 .75.75h2.495c.084 0 .16-.042.211-.109q.093-.12.203-.232l3.5-3.5a2.25 2.25 0 0 1 3.182 0l3.5 3.5q.11.11.203.232c.05.067.127.109.21.109H20a.75.75 0 0 0 .75-.75V4a.75.75 0 0 0-.75-.75zM15.75 7a.75.75 0 0 1 .75-.75H18a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75m.75 1.75a.75.75 0 0 0 0 1.5H18a.75.75 0 0 0 0-1.5zm-5.03 1.72a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 1 1-1.06 1.06l-2.22-2.22v7.69a.75.75 0 0 1-1.5 0v-7.69l-2.22 2.22a.75.75 0 0 1-1.06-1.06z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHddUpFill;

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
const SvgFileShredder = forwardRef<
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
          d="M6.5 3.25c-.69 0-1.25.56-1.25 1.25v6.75H4a.75.75 0 0 0 0 1.5h16a.75.75 0 0 0 0-1.5h-1.25V8a.75.75 0 0 0-.22-.53l-4-4a.75.75 0 0 0-.53-.22zm6.75 4.25c0 .69.56 1.25 1.25 1.25h2.75v2.5H6.75v-6.5h6.5zm2.94-.25-1.44-1.44v1.44zM6.75 15a.75.75 0 0 0-1.5 0v5a.75.75 0 0 0 1.5 0zM9 14.25a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75m3.75.75a.75.75 0 0 0-1.5 0v5a.75.75 0 0 0 1.5 0zm2.25-.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75M18.75 20v-5a.75.75 0 0 0-1.5 0v5a.75.75 0 0 0 1.5 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFileShredder;

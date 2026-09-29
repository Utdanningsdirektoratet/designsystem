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
const SvgArchive = forwardRef<
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
          d="M3.25 4A.75.75 0 0 1 4 3.25h16a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-.75.75h-.25V19A1.75 1.75 0 0 1 18 20.75H6A1.75 1.75 0 0 1 4.25 19V8.75H4A.75.75 0 0 1 3.25 8zm2.5 4.75h12.5V19a.25.25 0 0 1-.25.25H6a.25.25 0 0 1-.25-.25zm-1-4v2.5h14.5v-2.5zm9.25 8.5a.75.75 0 0 0 0-1.5h-4a.75.75 0 0 0 0 1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgArchive;

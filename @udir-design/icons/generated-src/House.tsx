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
const SvgHouse = forwardRef<
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
          d="M11.47 2.47a.75.75 0 0 1 1.06 0l7 7c.141.14.22.331.22.53v11a.75.75 0 0 1-.75.75h-5a.75.75 0 0 1-.75-.75v-4.25h-2.5V21a.75.75 0 0 1-.75.75H5a.75.75 0 0 1-.75-.75V10a.75.75 0 0 1 .22-.53zm-5.72 7.84v9.94h3.5V16a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 .75.75v4.25h3.5v-9.94L12 4.06z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHouse;

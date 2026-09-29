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
const SvgHanger = forwardRef<
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
          d="M10.25 8c0-.58.19-1.004.468-1.282S11.42 6.25 12 6.25s1.004.19 1.282.468.468.702.468 1.282c0 .158-.064.35-.25.611-.192.268-.457.536-.78.859l-.022.02c-.297.298-.647.648-.918 1.027-.268.376-.506.843-.528 1.397L5.307 13.4a2.715 2.715 0 0 0 .658 5.35h12.07a2.715 2.715 0 0 0 .658-5.35l-5.937-1.484c.02-.141.09-.31.245-.527.191-.268.456-.536.78-.859l.02-.02c.298-.298.648-.648.919-1.027.282-.395.53-.89.53-1.483 0-.92-.31-1.746-.907-2.343S12.92 4.75 12 4.75s-1.746.31-2.343.907S8.75 7.08 8.75 8a.75.75 0 0 0 1.5 0m-4.58 6.855L12 13.273l6.33 1.582a1.215 1.215 0 0 1-.295 2.395H5.965a1.215 1.215 0 0 1-.294-2.395"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHanger;

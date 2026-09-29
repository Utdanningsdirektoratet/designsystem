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
const SvgSandbox = forwardRef<
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
          d="M12.375 2.35a.75.75 0 0 0-.75 0L7.742 4.592l-.03.017L3.85 6.84a.75.75 0 0 0-.394.69V16.5a.75.75 0 0 0 .375.65l3.88 2.24.035.02 3.862 2.23a.75.75 0 0 0 .756.016l.011-.006 7.794-4.5a.75.75 0 0 0 .375-.65v-9a.75.75 0 0 0-.375-.65zM11.25 12.433 4.956 8.8v2.771l.058.03 3.464 2a.75.75 0 0 1 .375.65v4.067L11.25 19.7zm1.5 0V19.7l2.397-1.384V14.25a.75.75 0 0 1 .375-.65l3.464-2 .058-.03V8.8zM18.294 7.5l-2.397-1.384-3.522 2.034a.75.75 0 0 1-.75 0L8.103 6.116 5.706 7.5 12 11.134zM12 6.634l2.397-1.384L12 3.866 9.603 5.25zm4.647 10.817 2.398-1.384v-2.768l-2.398 1.384zm-9.294-2.768-2.397-1.384v2.768l2.397 1.384z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSandbox;

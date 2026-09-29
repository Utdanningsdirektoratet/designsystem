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
const SvgCar = forwardRef<
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
          d="M5.8 6.35A2.75 2.75 0 0 1 8 5.25h5c.866 0 1.68.408 2.2 1.1l2.268 3.025 3.146 1.18a1.75 1.75 0 0 1 1.136 1.638v1.526a1.75 1.75 0 0 1-1.326 1.698l-.68.17q.006.08.006.163a2.5 2.5 0 0 1-5 0h-5a2.5 2.5 0 0 1-5 0H4A1.75 1.75 0 0 1 2.25 14v-3c0-.825.57-1.516 1.339-1.701zm1.2.9-1.5 2h3.25v-2.5H8a1.25 1.25 0 0 0-1 .5m7 0 1.5 2h-5.25v-2.5H13c.393 0 .764.185 1 .5m6.088 4.709-3.224-1.209H3.996a.25.25 0 0 0-.246.25v3c0 .138.112.25.25.25h1.25c.456-.607 1.182-1 2-1s1.544.393 2 1h6c.456-.607 1.182-1 2-1 .785 0 1.486.362 1.944.928l.867-.216a.25.25 0 0 0 .189-.243v-1.526a.25.25 0 0 0-.162-.234M6.25 15.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0m10 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCar;

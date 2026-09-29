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
const SvgPhoneSlash = forwardRef<
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
          d="M15.711 12.238a1.25 1.25 0 0 1 1.577 0l.096.086 3.793 3.793a1.25 1.25 0 0 1 0 1.767l-2.781 2.782a2.61 2.61 0 0 1-2.81.577 23 23 0 0 1-5.354-3.026.75.75 0 0 1 .906-1.196 21.5 21.5 0 0 0 5.004 2.828c.41.164.88.069 1.193-.244L19.94 17l-3.44-3.439-1.968 1.97a.75.75 0 0 1-1.062 0l-.346-.346a.749.749 0 0 1 .84-1.21l1.653-1.651zm2.563-7.073a.751.751 0 0 1 1.061 1.061L5.031 20.531a.75.75 0 0 1-1.061-1.062zM6.116 2.824a1.25 1.25 0 0 1 1.672-.086l.096.086 3.793 3.793a1.25 1.25 0 0 1 0 1.767L10.061 10l.278.279a.75.75 0 0 1-1.06 1.06l-.81-.808a.75.75 0 0 1 0-1.06l1.97-1.97-3.44-3.44-2.603 2.604c-.313.313-.41.782-.245 1.193a21.5 21.5 0 0 0 3.216 5.502.75.75 0 0 1-1.167.941 23 23 0 0 1-3.442-5.886 2.61 2.61 0 0 1 .577-2.81z"
        />
      </svg>
    );
  },
);
export default SvgPhoneSlash;

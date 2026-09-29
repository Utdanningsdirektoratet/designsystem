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
const SvgTabsAdd = forwardRef<
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
          d="M6.25 4c0-.966.784-1.75 1.75-1.75h12c.966 0 1.75.784 1.75 1.75v12A1.75 1.75 0 0 1 20 17.75H8A1.75 1.75 0 0 1 6.25 16zM8 3.75a.25.25 0 0 0-.25.25v12c0 .138.112.25.25.25h12a.25.25 0 0 0 .25-.25V4a.25.25 0 0 0-.25-.25zm-4 4a.25.25 0 0 0-.25.25v12c0 .138.112.25.25.25h12a.25.25 0 0 0 .25-.25v-.5a.75.75 0 0 1 1.5 0v.5A1.75 1.75 0 0 1 16 21.75H4A1.75 1.75 0 0 1 2.25 20V8c0-.966.784-1.75 1.75-1.75h.5a.75.75 0 0 1 0 1.5zm10-2.5a.75.75 0 0 1 .75.75v3.25H18a.75.75 0 0 1 0 1.5h-3.25V14a.75.75 0 0 1-1.5 0v-3.25H10a.75.75 0 0 1 0-1.5h3.25V6a.75.75 0 0 1 .75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTabsAdd;

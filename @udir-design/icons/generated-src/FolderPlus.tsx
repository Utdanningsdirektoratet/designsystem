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
const SvgFolderPlus = forwardRef<
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
          d="M3.75 6A.25.25 0 0 1 4 5.75h6a.25.25 0 0 1 .25.25v2c0 .414.336.75.75.75h9.25v9.5H3.75zM4 4.25A1.75 1.75 0 0 0 2.25 6v12.5c0 .69.56 1.25 1.25 1.25h17c.69 0 1.25-.56 1.25-1.25v-10c0-.69-.56-1.25-1.25-1.25h-8.75V6A1.75 1.75 0 0 0 10 4.25zm8 6a.75.75 0 0 1 .75.75v1.75h1.75a.75.75 0 0 1 0 1.5h-1.75V16a.75.75 0 0 1-1.5 0v-1.75H9.5a.75.75 0 0 1 0-1.5h1.75V11a.75.75 0 0 1 .75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFolderPlus;

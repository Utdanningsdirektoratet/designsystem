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
const SvgNok = forwardRef<
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
          d="M3.304 8.276a.75.75 0 0 1 .844.346l2.102 3.604V9a.75.75 0 1 1 1.5 0v6a.75.75 0 0 1-1.398.378L4.25 11.774V15a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .554-.724M12 9.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5M8.25 12a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0m12.73-3.576a.75.75 0 0 1 .096 1.056l-2.1 2.52 2.1 2.52a.75.75 0 0 1-1.152.96l-2.174-2.609V15a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 1.5 0v2.129l2.174-2.61a.75.75 0 0 1 1.056-.095"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgNok;

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
const SvgVideoSlashFill = forwardRef<
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
          d="M2.677 8.359a.25.25 0 0 0-.427.177V17c0 .966.784 1.75 1.75 1.75h8.465a.25.25 0 0 0 .176-.427zm13.646 7.282a.25.25 0 0 0 .427-.177V7A1.75 1.75 0 0 0 15 5.25H6.536a.25.25 0 0 0-.177.427zm1.927.084c0 .109.07.205.174.238l2.347.751A.75.75 0 0 0 21.75 16V8a.75.75 0 0 0-.979-.714l-2.347.75a.25.25 0 0 0-.174.239zM4.03 5.47a.75.75 0 0 0-1.06 1.06l12 12a.75.75 0 1 0 1.06-1.06z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgVideoSlashFill;

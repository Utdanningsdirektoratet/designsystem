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
const SvgTeddyBearFill = forwardRef<
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
          d="M14.612 3.04 14 3.5l-.211-.106a4 4 0 0 0-3.578 0L10 3.5l-.717-.538a2 2 0 0 0-2.501.082l-.175.15a2 2 0 0 0 .272 3.234L7 6.5v.764c0 1.841.967 3.535 2.524 4.478a4.5 4.5 0 0 0-.576.452.28.28 0 0 1-.327.036q-.069-.038-.139-.075l-.12-.065-1.63-.906a1.457 1.457 0 1 0-1.414 2.548l1.951 1.084q.13.072.268.115a5 5 0 0 0-.036.554c0 .09.051.17.127.217q.2.125.373.298l1 1a2.12 2.12 0 0 1 .55 2.049.26.26 0 0 0 .106.293A4.5 4.5 0 0 0 12 20c.86 0 1.662-.24 2.345-.658a.26.26 0 0 0 .106-.294A2.12 2.12 0 0 1 15 17l1-1q.172-.172.372-.298a.26.26 0 0 0 .127-.217 5 5 0 0 0-.036-.554q.137-.043.268-.115l1.951-1.085a1.457 1.457 0 0 0-1.415-2.547l-1.73.962-.083.045-.074.04a.28.28 0 0 1-.328-.037 4.5 4.5 0 0 0-.576-.452A5.24 5.24 0 0 0 17 7.264V6.5l.155-.116a2 2 0 0 0 .214-3.015l-.143-.143a2 2 0 0 0-2.614-.185M12 8.942a.75.75 0 0 0-1.03 1.09l.5.5a.75.75 0 0 0 1.06 0l.5-.5A.75.75 0 0 0 12 8.94M10.5 6.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm2.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5h-.01a.75.75 0 0 1-.75-.75m-7.22 9.03a1.37 1.37 0 0 0 0 1.94l1 1a1.371 1.371 0 0 0 1.94-1.94l-1-1a1.37 1.37 0 0 0-1.94 0m12.94 0a1.37 1.37 0 0 0-1.94 0l-1 1a1.371 1.371 0 1 0 1.94 1.94l1-1a1.37 1.37 0 0 0 0-1.94"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTeddyBearFill;

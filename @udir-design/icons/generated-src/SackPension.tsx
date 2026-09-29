import {
  forwardRef,
  useId,
  type Ref,
  type SVGAttributes,
  type SVGProps,
} from 'react';
interface SVGRProps {
  /**
   * @deprecated Use `aria-label` for an accessible name, and the `Tooltip` component from `@udir-design/react` for a tooltip. Will be removed in the next major version.
   */
  title?: string;
  /**
   * @deprecated Only used by the deprecated `title` prop. Will be removed in the next major version.
   */
  titleId?: string;
}
const SvgSackPension = forwardRef<
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
          d="m8.333 3.872.633 1.897q-.626.249-1.15.61C6.75 7.115 6.06 8.147 5.614 9.305c-.817 2.12-.86 4.8-.863 7.204-.127.065-.27.145-.416.242-.42.28-1.084.85-1.084 1.749 0 .77.388 1.324.72 1.655a3 3 0 0 0 .666.5l.017.01.007.003.002.002h.003a.75.75 0 0 0 .335.08h14a.75.75 0 0 0 .335-.08L19 20c.335.67.337.67.337.67l.003-.002.007-.003.017-.01q.02-.01.051-.027a3.03 3.03 0 0 0 .615-.472c.332-.332.72-.887.72-1.656 0-.898-.664-1.469-1.084-1.749a4 4 0 0 0-.416-.242c-.002-2.404-.046-5.085-.863-7.204-.446-1.158-1.136-2.19-2.204-2.926a5.8 5.8 0 0 0-1.149-.61l.633-1.897c.428-1.285-.69-2.515-1.98-2.31-.673.106-1.324.188-1.687.188s-1.014-.082-1.687-.189c-1.29-.204-2.408 1.026-1.98 2.31m1.746-.829c-.227-.036-.38.182-.323.355l.659 1.975A9.7 9.7 0 0 1 12 5.25a9.7 9.7 0 0 1 1.585.123l.659-1.975c.057-.173-.096-.39-.323-.355-.66.104-1.424.207-1.921.207s-1.26-.103-1.92-.207m8.708 16.207c.055-.04.12-.092.183-.155.168-.169.28-.364.28-.595 0-.102-.086-.281-.416-.501a2.8 2.8 0 0 0-.537-.275l-.031-.012h-.004l-.002-.001a.75.75 0 0 1-.51-.711c0-2.61-.01-5.205-.762-7.156-.367-.95-.895-1.706-1.656-2.23S13.511 6.75 12 6.75s-2.571.34-3.332.864-1.29 1.28-1.656 2.23C6.26 11.795 6.25 14.389 6.25 17a.75.75 0 0 1-.51.71l-.002.001-.004.002-.021.007-.01.004a2.8 2.8 0 0 0-.537.275c-.33.22-.416.4-.416.501 0 .23.112.426.28.595.064.063.128.115.183.155zM11 9.75a.75.75 0 0 0-.75.75V16a.75.75 0 0 0 1.5 0v-1.75h.75v-.75.75h.042l.076-.005a2.6 2.6 0 0 0 .967-.262c.277-.138.576-.357.805-.7.231-.347.36-.777.36-1.283s-.129-.936-.36-1.283a2.07 2.07 0 0 0-.805-.7 2.6 2.6 0 0 0-1.043-.266h-.026l-.009-.001h-.006l-.001.75v-.75zm1.493 3h-.743v-1.5h.743l.018.001q.033.002.1.012c.092.015.202.045.304.095a.57.57 0 0 1 .227.19c.05.075.108.208.108.452s-.059.377-.108.451a.57.57 0 0 1-.227.19 1.1 1.1 0 0 1-.422.109"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSackPension;

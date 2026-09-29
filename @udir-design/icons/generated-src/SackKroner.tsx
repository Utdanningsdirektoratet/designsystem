import React, {
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
const SvgSackKroner = forwardRef<
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
          d="M10.08 3.043c-.228-.036-.38.182-.324.355l.659 1.975A9.7 9.7 0 0 1 12 5.25a9.7 9.7 0 0 1 1.585.123l.659-1.975c.057-.173-.096-.39-.323-.355-.66.104-1.424.207-1.921.207s-1.26-.103-1.92-.207m-1.747.829.633 1.897q-.626.249-1.15.61C6.75 7.115 6.06 8.147 5.614 9.305c-.817 2.12-.86 4.8-.863 7.204-.127.065-.27.145-.416.242-.42.28-1.084.85-1.084 1.749 0 .77.388 1.324.72 1.655a3 3 0 0 0 .666.5l.017.01.007.003.002.002h.002L5 20l-.335.67a.75.75 0 0 0 .335.08h14a.75.75 0 0 0 .335-.08L19 20l.336.67h.002l.002-.002.007-.003.017-.01q.02-.01.051-.027a3.03 3.03 0 0 0 .615-.472c.332-.332.72-.887.72-1.656 0-.898-.664-1.469-1.084-1.749a4 4 0 0 0-.416-.242c-.002-2.404-.046-5.085-.863-7.204-.446-1.158-1.136-2.19-2.204-2.926a5.8 5.8 0 0 0-1.149-.61l.633-1.897c.428-1.285-.69-2.515-1.98-2.31-.673.106-1.324.188-1.687.188s-1.014-.082-1.687-.189c-1.29-.204-2.408 1.026-1.98 2.31M18.787 19.25c.055-.04.12-.092.183-.155.168-.169.28-.364.28-.595 0-.102-.086-.281-.416-.501a2.8 2.8 0 0 0-.537-.275l-.031-.012h-.004v-.001h-.002a.75.75 0 0 1-.51-.711c0-2.61-.01-5.205-.762-7.156-.367-.95-.895-1.706-1.656-2.23S13.511 6.75 12 6.75s-2.571.34-3.332.864-1.29 1.28-1.656 2.23C6.26 11.795 6.25 14.389 6.25 17a.75.75 0 0 1-.51.71l-.001.001h-.001l-.004.002-.031.011a2.8 2.8 0 0 0-.537.275c-.33.22-.416.4-.416.501 0 .23.112.426.28.595.064.063.128.115.183.155zm-7.53-8.344a.75.75 0 0 1 .15 1.05l-1.558 2.076 1.557 2.076a.75.75 0 1 1-1.2.9L9.03 15.44v1.118a.75.75 0 0 1-1.5 0v-5.052a.75.75 0 0 1 1.5 0v1.118l1.176-1.569a.75.75 0 0 1 1.05-.15m1.62-.15a.75.75 0 0 0-.75.75v5.052a.75.75 0 0 0 1.5 0v-1.776h.366l1.056 2.111a.75.75 0 1 0 1.342-.67l-.872-1.744a2.013 2.013 0 0 0-1.062-3.723zm1.563 2.526h.027a.513.513 0 0 0-.01-1.027h-.83v1.027z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSackKroner;

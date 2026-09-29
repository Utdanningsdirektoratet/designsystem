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
const SvgCoffeeFill = forwardRef<
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
          d="M11.05 1.9a.75.75 0 0 1 1.05.15l.98 1.306a1.75 1.75 0 0 1-.163 2.288l-.773.773a.25.25 0 0 0-.024.327l.98 1.306a.75.75 0 0 1-1.2.9l-.98-1.306a1.75 1.75 0 0 1 .163-2.288l.773-.773a.25.25 0 0 0 .024-.327L10.9 2.95a.75.75 0 0 1 .15-1.05m8.348 9.706c.355-.25.692-.378.95-.41.26-.032.36.037.389.067.033.033.129.18.035.555-.09.36-.334.804-.742 1.212-.409.409-.854.653-1.213.742-.148.037-.26.045-.344.039a9.3 9.3 0 0 0 .925-2.205m.32-1.807q.222-.064.445-.091c.556-.07 1.177.037 1.634.494.553.552.592 1.332.43 1.98-.166.665-.569 1.341-1.137 1.909-.567.568-1.244.97-1.909 1.137-.512.128-1.107.13-1.606-.148-1.395 1.637-3.357 2.67-5.575 2.67-4.371 0-7.75-4.015-7.75-8.75 0-.358.136-.657.329-.901q.086-.11.18-.2a2.6 2.6 0 0 1 .371-.3c.447-.3 1.044-.543 1.714-.734a15 15 0 0 1 2.004-.409.25.25 0 0 1 .278.207l.158.987a.253.253 0 0 1-.216.29c-.682.094-1.294.219-1.812.367-.596.17-1.024.36-1.286.536a.185.185 0 0 0 0 .314c.262.177.69.366 1.286.536 1.183.338 2.86.557 4.744.557s3.561-.22 4.744-.557c.596-.17 1.024-.36 1.286-.536a.185.185 0 0 0 0-.314c-.262-.177-.69-.366-1.286-.536a13.5 13.5 0 0 0-1.91-.38.25.25 0 0 1-.213-.19l-.253-1.04a.247.247 0 0 1 .266-.306c.944.106 1.8.267 2.522.474.46.131.887.287 1.253.47a5 5 0 0 1 .46.265 3 3 0 0 1 .308.239q.12.106.227.238c.201.248.346.554.346.923q0 .403-.032.8M4.985 15.684a.25.25 0 0 0-.314-.07l-.089.05c-.657.38-1.332.977-1.332 1.836 0 .695.45 1.219.933 1.576.498.369 1.172.669 1.936.908 1.539.48 3.618.766 5.881.766s4.342-.286 5.88-.766c.765-.24 1.439-.54 1.937-.908.484-.357.933-.881.933-1.576 0-.859-.675-1.457-1.332-1.836l-.09-.05a.25.25 0 0 0-.313.07C17.363 17.83 14.902 19.25 12 19.25c-2.903 0-5.363-1.419-7.015-3.566"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCoffeeFill;

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
const SvgRockingHorseFill = forwardRef<
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
          d="M10 2.25a.75.75 0 0 1 .75.75v1.83c.267.575.614 1.508.894 2.293.153.43.292.83.394 1.127H16c1.307 0 2.157.678 2.643 1.49q.15.249.256.51H20c.966 0 1.75.784 1.75 1.75v3a.75.75 0 0 1-1.5 0v-3a.25.25 0 0 0-.25-.25h-.758q.008.133.008.25c0 .596-.144 1.49-.607 2.26-.396.662-1.033 1.234-1.963 1.424l1.26 2.519q.531-.467.977-1.017a.75.75 0 0 1 1.166.943 9.73 9.73 0 0 1-7.583 3.62 9.73 9.73 0 0 1-7.583-3.62.75.75 0 1 1 1.166-.944q.445.551.977 1.018l1.274-2.55a2.94 2.94 0 0 1-1.24-.748c-.48-.48-.844-1.161-.844-1.905V9.885l-2.127.355a.75.75 0 0 1-.458-.07s.034.02-.038-.019l-.06-.034a2.67 2.67 0 0 1-.653-.586C2.566 9.095 2.25 8.432 2.25 7.5s.316-1.595.664-2.031a2.7 2.7 0 0 1 .654-.586l.09-.05-.004.002h-.002L6.665 3.33c.718-.359 1.556-.338 2.26-.103q.164.054.325.127V3a.75.75 0 0 1 .75-.75M8.29 19.097a8.2 8.2 0 0 0 4.21 1.153c1.538 0 2.977-.42 4.21-1.153l-1.673-3.347H9.963z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgRockingHorseFill;

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
const SvgFlower = forwardRef<
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
          d="M18.75 8.5a6.75 6.75 0 0 1-6 6.709V21.5a.75.75 0 0 1-1.5 0v-6.291a6.751 6.751 0 1 1 7.5-6.709M12 3.25a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5m-8.5 11V15zh.03l.062.002q.08.002.22.012c.183.013.441.039.749.09a8.1 8.1 0 0 1 2.274.725c.84.42 1.701 1.06 2.352 2.036.653.98 1.063 2.254 1.063 3.885a.75.75 0 0 1-.75.75V21v.75h-.03l-.062-.002a8.124 8.124 0 0 1-.968-.102 8.1 8.1 0 0 1-2.275-.725c-.84-.42-1.701-1.06-2.352-2.036C3.16 17.905 2.75 16.63 2.75 15a.75.75 0 0 1 .75-.75m5.205 5.92c-.107-.947-.396-1.668-.767-2.223-.474-.712-1.112-1.196-1.773-1.526a6.6 6.6 0 0 0-1.85-.587l-.02-.004c.107.947.396 1.668.767 2.223.474.712 1.112 1.196 1.773 1.526a6.6 6.6 0 0 0 1.85.587zM20.5 14.25a.75.75 0 0 1 .75.75c0 1.631-.41 2.904-1.064 3.885-.65.975-1.512 1.616-2.35 2.036a8.1 8.1 0 0 1-2.275.725 8 8 0 0 1-.969.102l-.063.002h-.028L14.5 21v.75a.75.75 0 0 1-.75-.75c0-1.631.41-2.904 1.063-3.885.65-.975 1.513-1.616 2.352-2.036a8.1 8.1 0 0 1 2.274-.725 8 8 0 0 1 .969-.102l.063-.002h.028l.001.75zm-.795 1.58-.02.004a6.6 6.6 0 0 0-1.85.587c-.66.33-1.299.814-1.774 1.526-.37.555-.659 1.276-.766 2.223l.02-.004a6.6 6.6 0 0 0 1.85-.587c.66-.33 1.299-.814 1.774-1.526.37-.555.659-1.276.766-2.223"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFlower;

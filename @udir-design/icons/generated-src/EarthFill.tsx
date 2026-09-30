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
const SvgEarthFill = forwardRef<
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
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25M8.311 4.619a8.253 8.253 0 0 0 2.05 15.469v-.326c.001-1.26-.984-2.25-2.413-2.25-.808 0-1.546-.197-2.079-.718-.535-.524-.733-1.249-.733-2.024 0-1.203.638-2.164 1.492-2.799.845-.629 1.942-.974 3.008-.974.736 0 1.381.187 1.899.342l.04.012c.534.16.888.267 1.225.267q.003.001.02-.005a.3.3 0 0 0 .065-.039 1 1 0 0 0 .23-.28c.17-.29.27-.669.27-.965 0-.014-.013-.124-.191-.332a3.5 3.5 0 0 0-.713-.6 5.4 5.4 0 0 0-.876-.466 3 3 0 0 0-.307-.11q-.03.066-.07.168-.044.118-.093.258c-.032.09-.068.193-.105.29-.062.158-.177.443-.384.65a.87.87 0 0 1-.828.241.96.96 0 0 1-.52-.351 3 3 0 0 1-.288-.497l-.022-.046a3 3 0 0 0-.145-.269.4.4 0 0 0-.13.05.9.9 0 0 0-.222.208l-.054.066c-.079.098-.206.257-.319.364a1.27 1.27 0 0 1-.888.377c-.34 0-.735-.074-1.076-.32-.36-.26-.577-.652-.644-1.116-.079-.548.155-1.12.403-1.559A6.6 6.6 0 0 1 6.97 5.97c.172-.173.355-.33.514-.467l.1-.087c.189-.165.349-.312.493-.48a2.6 2.6 0 0 0 .234-.317m8.648 13.975a8.25 8.25 0 0 0 3.164-5.144h-.031c-.029 0-.082.01-.213.1-.031.02-.06.042-.098.068l-.005.004c-.036.026-.084.06-.133.092a1.4 1.4 0 0 1-.203.111.95.95 0 0 1-.38.082c-.243 0-.434-.107-.505-.148-.1-.057-.201-.13-.297-.202-.162-.122-.374-.294-.635-.507l-.157-.128-.144-.115c-.308-.249-.437-.353-.71-.353-.107 0-.299.07-.491.288-.189.213-.283.465-.283.65 0 .075.03.187.178.355.151.172.375.345.65.525.133.088.27.17.407.255l.017.01c.128.078.262.16.38.239.12.079.26.18.379.296.091.092.321.338.321.71 0 .572-.287.97-.727 1.469l-.002.003c-.466.522-.513.702-.513.86 0 .107.007.191.016.299z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgEarthFill;

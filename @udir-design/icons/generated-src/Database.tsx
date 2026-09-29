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
const SvgDatabase = forwardRef<
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
          d="M4.75 8c0-.235.106-.518.418-.841.316-.327.808-.655 1.476-.947C7.976 5.63 9.869 5.25 12 5.25s4.024.38 5.356.962c.667.292 1.16.62 1.476.947.312.323.418.606.418.841s-.106.518-.418.841c-.316.327-.809.655-1.476.947-1.332.583-3.225.962-5.356.962s-4.024-.38-5.356-.962c-.668-.292-1.16-.62-1.476-.947-.312-.323-.418-.606-.418-.841M12 3.75c-2.288 0-4.394.404-5.957 1.088-.78.341-1.46.767-1.954 1.278C3.592 6.631 3.25 7.27 3.25 8s.342 1.369.84 1.884c.493.51 1.172.937 1.953 1.278 1.563.684 3.67 1.088 5.957 1.088s4.394-.404 5.958-1.088c.78-.341 1.459-.767 1.953-1.278.497-.515.839-1.153.839-1.884s-.342-1.369-.84-1.884c-.494-.51-1.172-.937-1.953-1.278C16.395 4.154 14.288 3.75 12 3.75m-7.944 7.392a.75.75 0 0 1 .696.801L4.75 12c0 .235.106.518.418.841.316.327.808.655 1.476.947 1.332.583 3.225.962 5.356.962s4.024-.38 5.356-.962c.667-.292 1.16-.62 1.476-.947.312-.323.418-.606.418-.841q0-.029-.002-.057a.75.75 0 0 1 1.496-.105q.006.081.006.162c0 .731-.342 1.37-.84 1.884-.494.51-1.172.937-1.953 1.278-1.563.684-3.67 1.088-5.957 1.088s-4.394-.404-5.957-1.088c-.78-.341-1.46-.767-1.954-1.278-.497-.515-.839-1.153-.839-1.884q0-.081.006-.162a.75.75 0 0 1 .8-.696m0 4a.75.75 0 0 1 .696.801L4.75 16c0 .235.106.518.418.841.316.326.808.655 1.476.947 1.332.583 3.225.962 5.356.962s4.024-.38 5.356-.962c.667-.292 1.16-.62 1.476-.947.312-.323.418-.606.418-.841l-.002-.057a.75.75 0 0 1 1.496-.105q.006.081.006.162c0 .731-.342 1.37-.84 1.884-.494.51-1.172.937-1.953 1.278-1.563.684-3.67 1.088-5.957 1.088s-4.394-.404-5.957-1.088c-.78-.341-1.46-.767-1.954-1.278-.497-.515-.839-1.153-.839-1.884q0-.081.006-.162a.75.75 0 0 1 .8-.695"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgDatabase;

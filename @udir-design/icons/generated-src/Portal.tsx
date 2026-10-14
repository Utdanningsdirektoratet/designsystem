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
const SvgPortal = forwardRef<
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
          d="M6.212 6.644C5.63 7.976 5.25 9.869 5.25 12s.38 4.024.962 5.356c.292.667.62 1.16.947 1.476.323.312.606.418.841.418s.518-.106.841-.418c.327-.316.655-.809.947-1.476.583-1.332.962-3.225.962-5.356s-.38-4.024-.962-5.356c-.292-.668-.62-1.16-.947-1.476-.323-.312-.606-.418-.841-.418s-.518.106-.841.418c-.327.316-.655.808-.947 1.476m-.096-2.555C6.631 3.592 7.27 3.25 8 3.25s1.369.342 1.884.84c.51.493.937 1.172 1.278 1.953.684 1.563 1.088 3.67 1.088 5.957s-.404 4.394-1.088 5.958c-.341.78-.767 1.459-1.278 1.953-.515.497-1.153.839-1.884.839s-1.369-.342-1.884-.84c-.51-.494-.937-1.172-1.278-1.953C4.154 16.395 3.75 14.288 3.75 12s.404-4.394 1.088-5.957c.341-.78.767-1.46 1.278-1.954M12 4.75q-.03 0-.059.002a.75.75 0 0 1-.109-1.496q.084-.006.168-.006c.731 0 1.37.342 1.884.84.51.493.937 1.172 1.278 1.953.684 1.563 1.088 3.67 1.088 5.957s-.404 4.394-1.088 5.958c-.341.78-.767 1.459-1.278 1.953-.515.497-1.153.839-1.884.839q-.084 0-.168-.006a.75.75 0 0 1 .109-1.496l.059.002c.235 0 .518-.106.841-.418.327-.316.655-.809.947-1.476.583-1.332.962-3.225.962-5.356s-.38-4.024-.962-5.356c-.292-.668-.62-1.16-.947-1.476-.323-.312-.606-.418-.841-.418m3.943.002L16 4.75c.235 0 .518.106.841.418.326.316.655.808.947 1.476.583 1.332.962 3.225.962 5.356s-.38 4.024-.962 5.356c-.292.667-.62 1.16-.947 1.476-.323.312-.606.418-.841.418q-.029 0-.057-.002a.75.75 0 0 0-.104 1.496q.08.006.161.006c.731 0 1.369-.342 1.884-.84.51-.494.936-1.172 1.278-1.953.684-1.563 1.088-3.67 1.088-5.957s-.404-4.394-1.088-5.957c-.341-.78-.767-1.46-1.278-1.954-.515-.497-1.153-.839-1.884-.839a2 2 0 0 0-.161.006.75.75 0 0 0 .104 1.496"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPortal;

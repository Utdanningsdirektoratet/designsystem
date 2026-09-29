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
const SvgFigure = forwardRef<
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
          d="M10.75 4a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M12 1.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5M6.488 6.283c-1.224-.238-2.25.774-2.238 1.909.01.866.621 1.674 1.512 1.854 1.05.285 2.11.565 3.18.816l.045.01v.008c-.038 1.184-.101 2.302-.298 3.423-.228 1.125-.64 2.195-1.072 3.318-.195.505-.394 1.021-.581 1.558-.377 1.072.269 2.356 1.486 2.548.918.144 1.777-.422 2.064-1.258l.001-.002 1.409-4.147 1.408 4.147.001.003c.288.836 1.147 1.402 2.064 1.257 1.218-.191 1.864-1.476 1.487-2.547-.188-.537-.386-1.053-.581-1.558-.432-1.123-.844-2.194-1.072-3.318-.197-1.121-.26-2.24-.298-3.423v-.008l.045-.01c1.07-.252 2.13-.531 3.18-.816.89-.18 1.502-.988 1.512-1.854.012-1.135-1.015-2.147-2.238-1.91-.602.118-1.156.247-1.686.37-1.287.3-2.432.568-3.782.547l-.058-.001c-1.359.024-2.51-.244-3.805-.546a46 46 0 0 0-1.685-.37m6.222 7.476a.75.75 0 0 0-.645-.507.75.75 0 0 0-.784.506L9.169 19.98v.002a.39.39 0 0 1-.413.262.37.37 0 0 1-.267-.197.46.46 0 0 1-.037-.371v-.003c.155-.44.333-.903.516-1.38.453-1.179.94-2.446 1.194-3.703l.003-.018c.218-1.234.283-2.442.322-3.644.01-.311.001-.771-.331-1.117a1.24 1.24 0 0 0-.48-.301c-.122-.044-.258-.077-.362-.103l-.025-.006a94 94 0 0 1-3.16-.811l-.062-.014c-.16-.03-.314-.197-.316-.402a.44.44 0 0 1 .15-.33.35.35 0 0 1 .301-.09c.485.095.973.208 1.468.324 1.353.315 2.76.643 4.306.62h.012c1.558.028 2.974-.302 4.336-.62.495-.115.982-.228 1.467-.323.104-.02.21.01.302.09a.44.44 0 0 1 .15.33c-.002.204-.157.373-.316.402l-.062.014a94 94 0 0 1-3.16.81l-.025.007c-.105.025-.24.058-.362.103-.136.05-.32.134-.48.3-.332.347-.342.807-.331 1.118.038 1.202.104 2.41.322 3.643l.003.018c.254 1.258.74 2.525 1.194 3.704.183.477.36.939.515 1.38v.002a.46.46 0 0 1-.037.372.37.37 0 0 1-.267.197.39.39 0 0 1-.412-.263z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFigure;

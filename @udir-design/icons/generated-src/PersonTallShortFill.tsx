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
const SvgPersonTallShortFill = forwardRef<
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
          d="M8.5 2.25a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5m8 7.5a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5m-2.072 7.422c.478-.565 1.189-.922 2.072-.922s1.594.357 2.072.922c.465.548.678 1.253.678 1.928V21a.75.75 0 0 1-.75.75h-4a.75.75 0 0 1-.75-.75v-1.9c0-.675.213-1.38.678-1.928M8.5 10.25c-1.204 0-2.161.459-2.81 1.19-.638.716-.94 1.65-.94 2.56v7c0 .414.336.75.75.75h6a.75.75 0 0 0 .75-.75v-7c0-.91-.302-1.844-.94-2.56-.649-.731-1.606-1.19-2.81-1.19"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPersonTallShortFill;

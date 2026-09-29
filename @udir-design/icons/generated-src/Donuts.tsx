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
const SvgDonuts = forwardRef<
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
          d="M1.727 12.253c0-1.507.756-3.366 2.96-5.569s4.061-2.96 5.568-2.96a4.1 4.1 0 0 1 2.917 1.192l1.414 1.415c.2.199.466.511.697.936 2.73.124 4.375.902 5.335 1.918A4.1 4.1 0 0 1 21.75 12v2a4.1 4.1 0 0 1-1.22 2.906c-1.065 1.065-2.915 1.844-6.03 1.844-2.583 0-4.296-.535-5.415-1.327a5.2 5.2 0 0 1-1.835.353 4.1 4.1 0 0 1-2.917-1.192l-1.414-1.415a4.1 4.1 0 0 1-1.192-2.917m1.5 0a2.6 2.6 0 0 0 .752 1.856l1.415 1.414a2.6 2.6 0 0 0 1.856.753c.968 0 2.468-.481 4.508-2.52s2.52-3.54 2.52-4.509a2.6 2.6 0 0 0-.753-1.856l-1.414-1.414a2.6 2.6 0 0 0-1.856-.753c-.968 0-2.468.481-4.508 2.52s-2.52 3.54-2.52 4.509m12.55-3.006q0-.231-.022-.446c2.122.181 3.21.818 3.773 1.414.631.669.722 1.412.722 1.785v2a2.6 2.6 0 0 1-.78 1.845c-.685.684-2.086 1.405-4.97 1.405-1.784 0-3-.276-3.83-.648.675-.443 1.391-1.03 2.148-1.786q.513-.514.926-1.003.367.037.756.037c.906 0 1.762-.157 2.42-.442.327-.142.64-.33.88-.578.245-.25.45-.6.45-1.03 0-.809-.683-1.304-1.221-1.558a5 5 0 0 0-1.291-.389q.04-.312.04-.606m.546 2.784c-.368.16-.896.28-1.514.311a8 8 0 0 0 .527-1.034c.43.062.79.167 1.053.291.18.085.273.155.32.2-.067.063-.19.147-.386.232m-9.977-.49v-.001zm-.004-.078c.003-.091.03-.237.11-.436.17-.434.532-.984 1.063-1.515S8.595 8.62 9.03 8.45c.198-.079.344-.106.436-.11a1.4 1.4 0 0 1-.11.437c-.171.434-.532.983-1.063 1.514s-1.08.892-1.515 1.064a1.4 1.4 0 0 1-.436.11m3.202-3.119h-.002zm-.082-.08V8.26zm-3.196 3.195h-.002zm-1.21-.983c.264-.667.758-1.384 1.398-2.024s1.358-1.135 2.024-1.398a2.8 2.8 0 0 1 1.032-.215c.35.004.741.107 1.046.41.304.305.406.696.41 1.046.004.346-.083.7-.215 1.032-.263.667-.757 1.383-1.398 2.024-.64.64-1.357 1.134-2.023 1.398-.332.131-.687.219-1.032.215-.35-.005-.742-.107-1.046-.411s-.406-.696-.41-1.046a2.8 2.8 0 0 1 .214-1.031m8.132-.63a.75.75 0 1 0-1.376-.596c-.403.931-.992 1.907-1.822 2.737a.75.75 0 0 0 1.06 1.061c.993-.992 1.678-2.14 2.138-3.202m5.088 5.651a.75.75 0 0 0-.552-1.394c-.944.373-2.05.647-3.224.647a.75.75 0 0 0 0 1.5c1.403 0 2.699-.326 3.776-.753"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgDonuts;

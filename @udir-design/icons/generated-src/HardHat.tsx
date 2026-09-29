import React, {
  forwardRef,
  useId,
  type Ref,
  type SVGAttributes,
  type SVGProps,
} from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHardHat = forwardRef<
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
          d="M3.25 12c0-3.153 2.16-5.8 5.082-6.542a2.7 2.7 0 0 1 .443-.908c.546-.728 1.542-1.3 3.225-1.3s2.68.572 3.225 1.3c.244.326.374.652.443.908A6.75 6.75 0 0 1 20.75 12v4.823l.559 1.118a1.25 1.25 0 0 1-1.118 1.809H3.809a1.25 1.25 0 0 1-1.118-1.809l.559-1.118zm6.5-2a.75.75 0 0 1-1.5 0V7.048A5.25 5.25 0 0 0 4.75 12v5a.75.75 0 0 1-.08.335l-.457.915h15.573l-.457-.915a.75.75 0 0 1-.08-.335v-5c0-2.285-1.46-4.23-3.499-4.951V10a.75.75 0 0 1-1.5 0V6.012q0-.006-.002-.018a1.179 1.179 0 0 0-.223-.544c-.204-.272-.708-.7-2.025-.7s-1.82.428-2.025.7a1.2 1.2 0 0 0-.225.562zm.25 3.25a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHardHat;

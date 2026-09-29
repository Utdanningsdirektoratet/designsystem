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
const SvgCombifridge1 = forwardRef<
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
          d="M6 2.25a.75.75 0 0 0-.75.75v18c0 .414.336.75.75.75h12a.75.75 0 0 0 .75-.75V3a.75.75 0 0 0-.75-.75zm2 7.5a.75.75 0 0 1 .75.75v.75h8.5v-7.5H6.75v6zm0 4.5a.75.75 0 0 0 .75-.75v-.75h8.5v7.5H6.75v-6zm-1.25-1.5v-1.5h.5v1.5zm6.25-8a.75.75 0 0 1 .75.75v.701l.607-.35a.75.75 0 1 1 .75 1.299l-.607.35.607.35a.75.75 0 0 1-.75 1.3l-.607-.351V9.5a.75.75 0 0 1-1.5 0v-.7l-.607.35a.75.75 0 1 1-.75-1.3l.607-.35-.607-.35a.75.75 0 1 1 .75-1.3l.607.35v-.7a.75.75 0 0 1 .75-.75m0 8.69.53.53c.274.273.682.727 1.027 1.235.321.47.693 1.136.693 1.795a2.25 2.25 0 0 1-4.5 0c0-.66.372-1.324.693-1.795a9 9 0 0 1 1.027-1.235zm-.318 2.609c-.304.447-.432.782-.432.951a.75.75 0 0 0 1.5 0c0-.17-.128-.504-.432-.951-.1-.148-.21-.292-.318-.426a7 7 0 0 0-.318.426"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCombifridge1;

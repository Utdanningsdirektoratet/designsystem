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
const SvgIvFluidBag = forwardRef<
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
          d="M9.354 4.25a2.751 2.751 0 0 1 5.293 0H17a.75.75 0 0 1 .75.75v14a.75.75 0 0 1-.75.75h-4.25V21a.75.75 0 0 1-1.5 0v-1.25H7a.75.75 0 0 1-.75-.75V5A.75.75 0 0 1 7 4.25zm1.646 0a1.248 1.248 0 0 1 2 0zm5.25 1.5v12.5h-8.5V5.75zm-4.25 3 .646-.38a.75.75 0 0 0-1.292 0l-.007.01-.018.03-.065.114a36 36 0 0 0-.933 1.723 19 19 0 0 0-.716 1.558c-.186.47-.365 1.01-.365 1.445a2.75 2.75 0 1 0 5.5 0c0-.435-.18-.976-.365-1.445-.2-.504-.461-1.055-.716-1.558a37 37 0 0 0-.933-1.723l-.066-.113-.017-.03-.006-.01s0-.002-.647.379m0 0-.646-.38zm-.331 2.175q.17-.335.331-.635.162.3.331.635c.245.484.484.989.66 1.432.188.478.259.776.259.893a1.25 1.25 0 1 1-2.5 0c0-.117.07-.415.26-.893.175-.443.414-.948.659-1.432"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgIvFluidBag;

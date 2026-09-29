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
const SvgDogHarness = forwardRef<
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
          d="M18.283 18.516a20 20 0 0 1-1.663-4.076l3.91-3.91a2.871 2.871 0 1 0-4.06-4.06l-1.228 1.227a241 241 0 0 1-.48-2.684l-.017-.103-.005-.033-.012-.059-.001-.002v-.003l-.003-.009-.007-.025-.024-.083a4.651 4.651 0 0 0-.495-1.094C13.831 3.016 13.134 2.25 12 2.25H9c-1.085 0-1.9.711-2.377 1.256-.236.27-.423.538-.554.744H4A1.75 1.75 0 0 0 2.25 6v1.94a3.31 3.31 0 0 0 3.31 3.31h2.014l-.036.183c-.135.68-.31 1.63-.468 2.708-.313 2.134-.578 4.845-.314 6.952a.75.75 0 0 0 .744.657H19a.75.75 0 0 0 .576-1.23l-.002-.003-.017-.02q-.023-.03-.071-.092-.098-.125-.277-.38c-.236-.34-.565-.848-.926-1.51M7.171 5.336a.75.75 0 0 1-.671.414H4a.25.25 0 0 0-.25.25v1.94a1.81 1.81 0 0 0 1.81 1.81H8.5a.75.75 0 0 1 .73.919v.003l-.003.013-.012.053-.045.207a55.164 55.164 0 0 0-.615 3.414c-.277 1.88-.494 4.093-.373 5.891h.507l6.261-6.261a22 22 0 0 1-.185-.842 359 359 0 0 1-.945-4.892c-1.019.447-2.194.627-3.138.346-.587-.174-1.132-.545-1.416-1.183-.276-.622-.242-1.36.023-2.155a.75.75 0 0 1 1.423.474c-.196.587-.146.912-.075 1.072.064.143.197.273.471.354.584.173 1.553.036 2.432-.438a196 196 0 0 1-.256-1.46l-.018-.104-.008-.03a3.15 3.15 0 0 0-.331-.734c-.258-.412-.56-.647-.927-.647H9c-.415 0-.85.289-1.248.744a4.7 4.7 0 0 0-.576.832zm9.796 13.898c.21.386.412.726.594 1.016h-6.75l4.608-4.609a21.5 21.5 0 0 0 1.548 3.593M19.47 9.47l-3.26 3.259c-.24-1.205-.451-2.292-.633-3.246L17.53 7.53a1.371 1.371 0 0 1 1.94 1.94"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgDogHarness;

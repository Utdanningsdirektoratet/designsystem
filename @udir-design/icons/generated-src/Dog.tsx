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
const SvgDog = forwardRef<
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
          d="m14.74 4.877-.012-.059-.001-.002v-.003l-.003-.009-.007-.025-.024-.083a4.651 4.651 0 0 0-.495-1.094C13.831 3.016 13.134 2.25 12 2.25H9c-1.085 0-1.9.711-2.377 1.256-.236.27-.423.538-.554.744H4A1.75 1.75 0 0 0 2.25 6v1.94a3.31 3.31 0 0 0 3.31 3.31h2.014l-.036.183c-.135.68-.31 1.63-.468 2.708-.313 2.134-.578 4.845-.314 6.952a.75.75 0 0 0 .744.657H19a.75.75 0 0 0 .576-1.23l-.002-.003-.017-.02q-.023-.03-.071-.092-.098-.125-.277-.38c-.236-.34-.565-.848-.926-1.51a20.2 20.2 0 0 1-2.048-5.662 344 344 0 0 1-1.122-5.862 208 208 0 0 1-.35-1.978l-.018-.103zM6.5 5.75a.75.75 0 0 0 .67-.414l.006-.01.026-.049q.037-.067.114-.192c.102-.164.25-.38.436-.591.398-.455.833-.744 1.248-.744h3c.367 0 .669.235.927.648a3.2 3.2 0 0 1 .33.734l.01.03.017.103.07.41q.069.394.187 1.05c-.88.474-1.849.611-2.433.438-.274-.081-.407-.21-.47-.354-.072-.16-.122-.485.074-1.072a.75.75 0 0 0-1.423-.474c-.265.794-.299 1.533-.023 2.155.284.638.829 1.01 1.416 1.183.944.28 2.12.101 3.138-.346.239 1.286.553 2.937.945 4.892a21.6 21.6 0 0 0 2.202 6.087c.21.386.412.726.594 1.016H8.182c-.12-1.798.096-4.011.373-5.89a55 55 0 0 1 .66-3.622l.012-.053.003-.013v-.003a.75.75 0 0 0-.73-.919H5.56a1.81 1.81 0 0 1-1.81-1.81V6A.25.25 0 0 1 4 5.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgDog;

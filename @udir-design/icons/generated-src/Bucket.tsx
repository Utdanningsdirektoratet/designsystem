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
const SvgBucket = forwardRef<
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
          d="M12 3.25c-2.252 0-4.316.227-5.839.608-.755.19-1.42.426-1.914.718-.44.26-.986.71-.997 1.403v.037q.002.157.038.298l1.97 13.296c.04.264.216.488.464.587h.001l.003.001.008.003.027.01q.034.015.097.037.126.046.356.122c.306.1.748.23 1.302.36 1.105.26 2.664.52 4.484.52s3.379-.26 4.484-.52c.554-.13.996-.26 1.302-.36a11 11 0 0 0 .453-.158l.027-.01.008-.004h.003l.002-.002a.75.75 0 0 0 .463-.586l1.97-13.296q.035-.14.038-.298V5.98c-.01-.693-.558-1.143-.997-1.403-.494-.292-1.159-.529-1.914-.718-1.523-.38-3.587-.608-5.839-.608M5.01 6.133A1.5 1.5 0 0 1 4.816 6c.042-.034.103-.08.194-.133.316-.186.823-.38 1.515-.554C7.898 4.97 9.834 4.75 12 4.75s4.102.22 5.475.563c.692.173 1.199.368 1.515.554q.133.082.194.133c-.042.034-.103.08-.194.133-.316.186-.823.38-1.515.554-1.373.343-3.309.563-5.475.563s-4.102-.22-5.475-.563c-.692-.173-1.199-.368-1.515-.554M6 19.5c-.279.696-.278.697-.278.697zM18.977 7.79a10 10 0 0 1-1.138.352c-1.523.38-3.587.608-5.839.608s-4.316-.227-5.839-.608a10 10 0 0 1-1.138-.352l1.653 11.153c.272.088.674.207 1.183.327 1.02.24 2.461.48 4.141.48s3.121-.24 4.14-.48c.51-.12.912-.24 1.183-.327h.001z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBucket;

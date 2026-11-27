import {
  Skeleton as DigdirSkeleton,
  type SkeletonProps as DigdirSkeletonProps,
} from '@digdir/designsystemet-react';
import cl from 'clsx/lite';
import { forwardRef } from 'react';
import { useStyleProperties } from '../../utilities/useStyleProperties';
import './skeleton.css';

type SkeletonProps = Omit<DigdirSkeletonProps, 'characters'>;
type Length = string | number | undefined;

/** A length for CSSOM, which unlike React's `style` prop does not add `px` to numbers */
const toCssLength = (value: Length) =>
  typeof value === 'number' ? `${value}px` : value;

/**
 * Whether an SVG `width`/`height` attribute takes the length as it is. Percentages would be
 * relative to the skeleton, which sizes itself to the SVG, and `calc()`/`var()` are CSS only.
 */
const isSvgLength = (value: Length) =>
  value === undefined ||
  typeof value === 'number' ||
  // Each digit can only match one way, so the test stays linear on long inputs
  /^(?:\d+(?:\.\d+)?|\.\d+)[a-z]*$/i.test(value);

// Digdir's `Skeleton` writes `width` and `height` to the `style` prop, which a strict Content
// Security Policy blocks when server-rendered. Instead, the skeleton gets a hidden SVG child with
// `width`/`height` attributes, which CSP doesn't govern: digdir sizes a skeleton with children
// to fit them. Values an SVG attribute can't take, and skeletons with their own children, are
// set with CSSOM after hydration instead.
const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  { width, height, variant, asChild, children, className, ...rest },
  forwardedRef,
) {
  // For `variant="text"`, digdir uses `width` as a character count, and ignores `height`
  const isText = variant === 'text';
  const isSized = !isText && (width !== undefined || height !== undefined);
  const sizeWithSvg =
    isSized &&
    !asChild &&
    children == null &&
    isSvgLength(width) &&
    isSvgLength(height);
  const ref = useStyleProperties(forwardedRef, {
    width: isSized && !sizeWithSvg ? toCssLength(width) : undefined,
    height: isSized && !sizeWithSvg ? toCssLength(height) : undefined,
  });

  if (sizeWithSvg) {
    const isCircle = variant === 'circle';
    // A circle is square, so one dimension is enough
    const svgWidth = isCircle ? (width ?? height) : width;
    const svgHeight = isCircle ? (height ?? width) : height;
    return (
      <DigdirSkeleton
        ref={ref}
        variant={variant}
        className={cl(
          // Without a width, a rectangle keeps digdir's full width
          svgWidth === undefined && 'uds-skeleton--full-width',
          className,
        )}
        {...rest}
      >
        <svg
          className="uds-skeleton__size"
          width={svgWidth ?? '100%'}
          height={svgHeight ?? '1.3em'}
          aria-hidden
        />
      </DigdirSkeleton>
    );
  }

  return (
    <DigdirSkeleton
      ref={ref}
      variant={variant}
      width={isText ? width : undefined}
      asChild={asChild}
      className={className}
      {...rest}
    >
      {children}
    </DigdirSkeleton>
  );
});

export type { SkeletonProps };
export { Skeleton };

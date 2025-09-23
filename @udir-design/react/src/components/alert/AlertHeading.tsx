import { forwardRef } from 'react';
import { Heading, type HeadingProps } from '../typography';

export type AlertHeadingProps = HeadingProps;

/**
 * AlertHeading component, used to display a heading in the Alert.
 *
 * @example
 * <Alert>
 *  <Alert.Heading>Heading</Alert.Heading>
 * </Alert>
 */
export const AlertHeading = forwardRef<HTMLHeadingElement, AlertHeadingProps>(
  function AlertHeading({ className, ...rest }, ref) {
    return <Heading ref={ref} data-size="xs" {...rest} />;
  },
);

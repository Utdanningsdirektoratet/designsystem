import { forwardRef } from 'react';
import { Heading, type HeadingProps } from '../typography/heading/Heading';

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
  function AlertHeading(props, ref) {
    return <Heading ref={ref} data-size="xs" {...props} />;
  },
);

import { Alert as AlertRoot } from './Alert';
import { AlertHeading } from './AlertHeading';

type Alert = typeof AlertRoot & {
  Heading: typeof AlertHeading;
};

const Alert: Alert = Object.assign(AlertRoot, {
  Heading: AlertHeading,
});

Alert.displayName = 'Alert';

export type { AlertProps } from './Alert';
export type { AlertHeadingProps } from './AlertHeading';
export { Alert, AlertHeading };

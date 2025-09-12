import { Alert as AlertRoot } from './Alert';
import { AlertHeading } from './AlertHeading';

type Alert = typeof AlertRoot & {
  Heading: typeof AlertHeading;
};

const AlertComponent: Alert = Object.assign(AlertRoot, {
  Heading: AlertHeading,
});

AlertComponent.displayName = 'Alert';
AlertComponent.Heading.displayName = 'Alert.Heading';

export type { AlertProps } from './Alert';
export type { AlertHeadingProps } from './AlertHeading';
export { AlertComponent as Alert, AlertHeading };

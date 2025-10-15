import { SeverityColors } from '@digdir/designsystemet-react/colors';
import { Alert } from 'src/components/alert';
import styles from './SimpleAlert.module.scss';

export const SimpleAlert: React.FC<
  React.PropsWithChildren<{
    heading?: string;
    type: SeverityColors;
  }>
> = ({ type, heading, children }) => (
  <Alert data-color={type} className={`sb-unstyled ${styles.simpleAlert}`}>
    {heading && (
      <Alert.Heading asChild>
        <p>{heading}</p>
      </Alert.Heading>
    )}
    {children}
  </Alert>
);

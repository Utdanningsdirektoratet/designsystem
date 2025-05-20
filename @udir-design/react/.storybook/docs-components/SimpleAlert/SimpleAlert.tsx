import { SeverityColors } from '@digdir/designsystemet-react/colors';
import { Alert, Heading } from '../../../src/alpha';
import styles from './SimpleAlert.module.scss';

export const SimpleAlert: React.FC<
  React.PropsWithChildren<{
    heading?: string;
    type: SeverityColors;
  }>
> = ({ type, heading, children }) => (
  <Alert data-color={type} className={`sb-unstyled ${styles.simpleAlert}`}>
    {heading && (
      <Heading
        asChild
        data-size="xs"
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        <p>{heading}</p>
      </Heading>
    )}
    {children}
  </Alert>
);

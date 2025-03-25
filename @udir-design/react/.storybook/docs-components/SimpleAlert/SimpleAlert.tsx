import { SeverityColors } from '@digdir/designsystemet-react/colors';
import { Alert, Heading } from '../../../src/alpha';
import styles from './SimpleAlert.module.scss';

export const SimpleAlert: React.FC<
  React.PropsWithChildren<{
    heading?: { text: string; level: 1 | 2 | 3 | 4 | 5 | 6 };
    type: SeverityColors;
  }>
> = ({ type, heading, children }) => (
  <Alert data-color={type} className={`sb-unstyled ${styles.simpleAlert}`}>
    {heading && (
      <Heading
        data-size="xs"
        level={heading.level}
        style={{
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        {heading.text}
      </Heading>
    )}
    {children}
  </Alert>
);

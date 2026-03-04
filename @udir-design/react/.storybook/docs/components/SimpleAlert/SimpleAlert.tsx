import type { SeverityColors } from '@digdir/designsystemet-react/colors';
import { LightBulbIcon } from '@udir-design/icons';
import { Alert } from 'src/components/alert';
import { Card } from 'src/components/card/Card';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import styles from './SimpleAlert.module.scss';

export const SimpleAlert: React.FC<
  React.PropsWithChildren<{
    heading?: string;
    type: SeverityColors | 'tip';
  }>
> = ({ type, heading, children }) =>
  type === 'tip' ? (
    <Card
      data-color="support1"
      variant="tinted"
      className={`sb-unstyled ${styles.simpleAlert} ${styles.simpleAlertCard}`}
    >
      <LightBulbIcon aria-hidden />
      <div>
        {heading && (
          <Heading data-size="xs" asChild>
            <div>{heading}</div>
          </Heading>
        )}
        <Paragraph>{children}</Paragraph>
      </div>
    </Card>
  ) : (
    <Alert data-color={type} className={`sb-unstyled ${styles.simpleAlert}`}>
      {heading && (
        <Alert.Heading data-size="xs" asChild>
          <div>{heading}</div>
        </Alert.Heading>
      )}
      {children}
    </Alert>
  );

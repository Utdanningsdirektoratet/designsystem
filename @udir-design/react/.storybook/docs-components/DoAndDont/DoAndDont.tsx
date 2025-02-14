import { CheckmarkIcon, XMarkIcon } from '@navikt/aksel-icons';
import cl from 'clsx';
import { Heading, Paragraph } from '../../../src/components/alpha';
import styles from './DoAndDont.module.css';

const Wrapper = ({ variant, description, children }: WrapperProps) => {
  const icon = variant === 'do' ? <CheckmarkIcon /> : <XMarkIcon />;
  const heading = variant === 'do' ? 'Gjør' : 'Unngå';

  return (
    <figure
      className={cl(styles.wrapper, styles[variant])}
      data-color-scheme="light"
    >
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        <Heading
          level={2}
          data-size="sm"
          style={{
            margin: 0,
            border: 'none',
          }}
          className="sb-unstyled"
        >
          {heading}
        </Heading>
      </div>
      <figcaption>
        <Paragraph className={cl(styles.description, 'sb-unstyled')}>
          {description}
        </Paragraph>
      </figcaption>

      <div className={styles.imageWrapper}>{children}</div>
    </figure>
  );
};

export const Do = ({ description, children }: DoAndDontProps) => {
  return <Wrapper variant="do" description={description} children={children} />;
};

export const Dont = ({ description, children }: DoAndDontProps) => {
  return (
    <Wrapper variant="dont" description={description} children={children} />
  );
};

type DoAndDontProps = {
  description: string;
  children: React.ReactNode;
};

type WrapperProps = DoAndDontProps & {
  variant: 'do' | 'dont';
};

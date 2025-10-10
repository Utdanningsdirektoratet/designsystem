import { CheckmarkIcon, XMarkIcon } from '@udir-design/icons';
import cl from 'clsx';
import { Heading, Paragraph } from '../../../../src/components/beta';
import styles from './DoAndDont.module.css';

const Wrapper = ({ variant, description, children }: WrapperProps) => {
  const icon = variant === 'do' ? <CheckmarkIcon /> : <XMarkIcon />;
  const heading = variant === 'do' ? 'Gjør' : 'Unngå';

  return (
    <figure
      className={cl('sb-unstyled', styles.wrapper, styles[variant])}
      data-color-scheme="light"
    >
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        <Heading
          asChild
          data-size="sm"
          style={{
            margin: 0,
            border: 'none',
          }}
          className="sb-unstyled"
        >
          <p>{heading}</p>
        </Heading>
      </div>
      <figcaption>
        <Paragraph className={cl(styles.description, 'sb-unstyled')}>
          {description}
        </Paragraph>
      </figcaption>
      <div className={styles.contentWrapper}>{children}</div>
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

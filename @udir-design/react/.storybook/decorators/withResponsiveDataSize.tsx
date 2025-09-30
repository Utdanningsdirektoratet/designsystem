import type { Decorator } from '@storybook/react-vite';
import styles from './withReponsiveDataSize.module.css';

export const withResponsiveDataSize: Decorator = (Story) => (
  <div data-size="auto" className={styles.size}>
    <Story />
  </div>
);

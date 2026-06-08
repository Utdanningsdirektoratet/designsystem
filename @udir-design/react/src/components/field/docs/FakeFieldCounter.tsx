import type { FunctionComponent } from 'react';
import type { FieldCounterProps } from '../Field';

type FieldCounterDocsProps = Omit<FieldCounterProps, 'hint'> & {
  /**
   * **@deprecated** The hint attribute is deprecated.
   */
  hint?: string;
};

/**
 * This component only exists to add relevant html props for FieldCounter
 */
export const FieldCounter: FunctionComponent<FieldCounterDocsProps> = () =>
  null;

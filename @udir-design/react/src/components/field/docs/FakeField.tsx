import type { FunctionComponent } from 'react';
import type { FieldProps } from '../Field';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for Field directly :(
 */
export const Field: FunctionComponent<FieldProps> = () => null;

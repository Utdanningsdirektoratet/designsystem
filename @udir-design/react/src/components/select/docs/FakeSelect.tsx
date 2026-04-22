import type { FunctionComponent } from 'react';
import type { SelectProps } from '../Select';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for Select directly :(
 */
export const Select: FunctionComponent<SelectProps> = () => null;

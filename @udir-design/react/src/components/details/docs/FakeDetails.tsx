import type { FunctionComponent } from 'react';
import type { DetailsProps } from '../Details';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for Details directly :(
 */
export const Details: FunctionComponent<DetailsProps> = () => null;

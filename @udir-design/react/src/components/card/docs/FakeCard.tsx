import type { FunctionComponent } from 'react';
import type { CardProps } from '../Card';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for Card directly :(
 */
export const Card: FunctionComponent<CardProps> = () => null;

import type { FunctionComponent } from 'react';
import { Card, type CardProps } from '../card/Card';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for Card directly :(
 */
export const FakeCardComponent: FunctionComponent<CardProps> = (props) => (
  <Card {...props} />
);
FakeCardComponent.displayName = 'Card';

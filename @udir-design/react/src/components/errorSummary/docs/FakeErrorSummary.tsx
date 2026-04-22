import type { FunctionComponent } from 'react';
import type { ErrorSummaryProps } from '../ErrorSummary';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for ErrorSummary directly :(
 */
export const ErrorSummary: FunctionComponent<ErrorSummaryProps> = () => null;

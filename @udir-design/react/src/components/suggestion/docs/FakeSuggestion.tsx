import type { FunctionComponent } from 'react';
import type { SuggestionProps } from '../Suggestion';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for Suggestion directly :(
 */
export const Suggestion: FunctionComponent<SuggestionProps> = () => null;

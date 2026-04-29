import type { FunctionComponent } from 'react';
import type { SearchProps } from '../Search';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for Search directly :(
 */
export const Search: FunctionComponent<SearchProps> = () => null;

import type { FunctionComponent } from 'react';
import type { ListUnorderedProps } from '../List';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for ListUnordered directly :(
 */
export const ListUnordered: FunctionComponent<ListUnorderedProps> = () => null;

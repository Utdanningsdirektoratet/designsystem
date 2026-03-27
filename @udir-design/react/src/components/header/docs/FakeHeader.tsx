import type { FunctionComponent } from 'react';
import type { HeaderProps } from '../Header';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for Header directly :(
 */
export const Header: FunctionComponent<HeaderProps> = () => null;

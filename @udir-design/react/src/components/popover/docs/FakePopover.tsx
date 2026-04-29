import type { FunctionComponent } from 'react';
import type { PopoverProps } from '../Popover';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for Popover directly :(
 */
export const Popover: FunctionComponent<PopoverProps> = () => null;

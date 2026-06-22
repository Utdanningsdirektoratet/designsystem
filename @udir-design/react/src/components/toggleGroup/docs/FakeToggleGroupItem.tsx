import type { FunctionComponent } from 'react';
import type { ToggleGroupItemProps } from '../';

/**
 * This component only exists to add relevant html props for ToggleGroupItem
 */
export const ToggleGroupItem: FunctionComponent<
  Omit<ToggleGroupItemProps, 'icon'> & {
    /**
     * **@deprecated** Icon prop is deprecated
     */
    icon?: boolean;
  }
> = () => null;

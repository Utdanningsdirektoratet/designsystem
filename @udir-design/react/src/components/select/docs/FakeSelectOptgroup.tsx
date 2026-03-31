import type { FunctionComponent } from 'react';
import type { SelectOptgroupProps } from '../Select';

/**
 * This component only exists because react-docgen-typescript doesn't manage to generate
 * Storybook controls for Select directly :(
 */
export const SelectOptgroup: FunctionComponent<
  SelectOptgroupProps & {
    /** Title of the group */
    label?: SelectOptgroupProps['label'];
    /** Should be one or more `Select.Option` elements */
    children?: SelectOptgroupProps['children'];
  }
> = () => null;

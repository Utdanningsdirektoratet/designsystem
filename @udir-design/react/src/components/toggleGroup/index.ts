import {
  ToggleGroupItem,
  type ToggleGroupItemProps,
} from '@digdir/designsystemet-react';
import {
  ToggleGroup as ToggleGroupParent,
  type ToggleGroupProps,
} from './ToggleGroup';

type ToggleGroup = typeof ToggleGroupParent & {
  /**
   * A single item in a ToggleGroup.
   * @example
   * <ToggleGroup.Item value='1'>Toggle 1</ToggleGroup.Item>
   */
  Item: typeof ToggleGroupItem;
};

/**
 * Display a group of buttons that can be toggled between.
 *
 * @example
 * <ToggleGroup data-toggle-group="Label" onChange={(value) => console.log(value)}>
 *   <ToggleGroup.Item value='1'>Toggle 1</ToggleGroup.Item>
 *   <ToggleGroup.Item value='2'>Toggle 2</ToggleGroup.Item>
 *   <ToggleGroup.Item value='3'>Toggle 3</ToggleGroup.Item>
 * </ToggleGroup>
 */
const ToggleGroup: ToggleGroup = Object.assign(ToggleGroupParent, {
  Item: ToggleGroupItem,
});

ToggleGroup.Item.displayName = 'ToggleGroup.Item';
export type { ToggleGroupItemProps, ToggleGroupProps };
export { ToggleGroup, ToggleGroupItem };

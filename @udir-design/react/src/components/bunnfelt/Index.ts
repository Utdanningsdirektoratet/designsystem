import { Bunnfelt as BunnfeltRoot } from './Bunnfelt';
import { BunnfeltItem } from './Bunnfelt-item';
import { BunnfeltList } from './Bunnfelt-list';

type Bunnfelt = typeof BunnfeltRoot & {
  /**
   * Bunnfelt.List component, used to display a list of items in the Bunnfelt.
   *
   * @example
   * <Bunnfelt>
   *  <Bunnfelt.List>
   *    <Bunnfelt.Item>
   *      <Bunnfelt.Button>Button</Bunnfelt.Button>
   *    </Bunnfelt.Item>
   *  </Bunnfelt.List>
   * </Bunnfelt>
   */
  List: typeof BunnfeltList;
  /**
   * Bunnfelt.Item component, used to display an item in the Bunnfelt. Used within a Bunnfelt.List.
   *
   * @example
   * <Bunnfelt>
   *  <Bunnfelt.List>
   *    <Bunnfelt.Item>
   *      <Bunnfelt.Button>Button</Bunnfelt.Button>
   *    </Bunnfelt.Item>
   *  </Bunnfelt.List>
   * </Bunnfelt>
   */
  Item: typeof BunnfeltItem;
};

const BunnfeltComponent: Bunnfelt = Object.assign(BunnfeltRoot, {
  List: BunnfeltList,
  Item: BunnfeltItem,
});

BunnfeltComponent.List.displayName = 'Bunnfelt.List';
BunnfeltComponent.Item.displayName = 'Bunnfelt.Item';

export type { BunnfeltProps } from './Bunnfelt';
export type { BunnfeltItemProps } from './Bunnfelt-item';
export type { BunnfeltListProps } from './Bunnfelt-list';
export { BunnfeltComponent as Bunnfelt, BunnfeltList, BunnfeltItem };

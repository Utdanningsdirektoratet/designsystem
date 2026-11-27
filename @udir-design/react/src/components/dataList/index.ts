import { DataList as DataListRoot } from './DataList';
import { DataListAside } from './DataListAside';
import { DataListItem } from './DataListItem';
import { DataListRow } from './DataListRow';
import { DataListTitle } from './DataListTitle';
import { DataListValue } from './DataListValue';

type DataList = typeof DataListRoot & {
  /**
   * One record in the list.
   *
   * @example
   * <DataList.Item>
   *   <DataList.Row>…</DataList.Row>
   *   <DataList.Aside>#1</DataList.Aside>
   * </DataList.Item>
   */
  Item: typeof DataListItem;
  /**
   * One line of values, separated by `·`.
   *
   * @example
   * <DataList.Row>
   *   <DataList.Title>Tittel</DataList.Title>
   *   <DataList.Value label="Status">Åpen</DataList.Value>
   * </DataList.Row>
   */
  Row: typeof DataListRow;
  /**
   * The title of the item. Put a link inside to make the whole item clickable.
   *
   * @example
   * <DataList.Title><a href="/1">Tittel</a></DataList.Title>
   */
  Title: typeof DataListTitle;
  /**
   * A single value in a row.
   *
   * @example
   * <DataList.Value label="Prioritet"><Tag>Lav</Tag></DataList.Value>
   */
  Value: typeof DataListValue;
  /**
   * Content at the end of the item, such as an id or action buttons.
   *
   * @example
   * <DataList.Aside>#1</DataList.Aside>
   */
  Aside: typeof DataListAside;
};

/**
 * Shows records as a list, as an alternative to `Table`.
 *
 * @example
 * <DataList aria-label="Oppgaver">
 *   <DataList.Item>
 *     <DataList.Row>
 *       <DataList.Title><a href="/1">Oppgavetittel</a></DataList.Title>
 *       <DataList.Value label="Status">Åpen</DataList.Value>
 *     </DataList.Row>
 *     <DataList.Aside>#1</DataList.Aside>
 *   </DataList.Item>
 * </DataList>
 */
const DataList: DataList = Object.assign(DataListRoot, {
  Item: DataListItem,
  Row: DataListRow,
  Title: DataListTitle,
  Value: DataListValue,
  Aside: DataListAside,
});

DataList.displayName = 'DataList';
DataList.Item.displayName = 'DataList.Item';
DataList.Row.displayName = 'DataList.Row';
DataList.Title.displayName = 'DataList.Title';
DataList.Value.displayName = 'DataList.Value';
DataList.Aside.displayName = 'DataList.Aside';

export type { DataListProps } from './DataList';
export type { DataListAsideProps } from './DataListAside';
export type { DataListItemProps } from './DataListItem';
export type { DataListRowProps } from './DataListRow';
export type { DataListTitleProps } from './DataListTitle';
export type { DataListValueProps } from './DataListValue';

export {
  DataList,
  DataListAside,
  DataListItem,
  DataListRow,
  DataListTitle,
  DataListValue,
};

import cl from 'clsx/lite';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { Card } from '../card';

export interface DataListItemProps extends Omit<
  HTMLAttributes<HTMLLIElement>,
  'data-color'
> {
  /**
   * Makes the whole item clickable, with a hover effect. A click anywhere on
   * the item follows the link in `DataList.Title`. Buttons, links, inputs and
   * labels inside the item keep working as usual.
   *
   * The link must be present when the item mounts.
   *
   * @default false
   */
  clickable?: boolean;
  /**
   * Id of the element that should be clicked when the user clicks anywhere on
   * the item, for example a checkbox. Also gives the item a hover effect. Use
   * `clickable` instead when the item should follow the link in the title.
   * Do not use both: when both are set, this one wins.
   */
  'data-clickdelegatefor'?: string;
  /**
   * One or more `DataList.Row` components, optionally a `DataList.Aside`, and
   * optionally a leading element such as a `Checkbox`.
   */
  children: ReactNode;
}

export const DataListItem = forwardRef<HTMLLIElement, DataListItemProps>(
  function DataListItem({ className, clickable = false, ...rest }, ref) {
    const classes = cl('uds-data-list__item', className);

    /* Digdir's `Card` finds the link in the heading and sets
       `data-clickdelegatefor` to it, which gives the click delegation and hover
       effect. Items that are not clickable skip `Card`, so links in them stay
       ordinary links. */
    if (clickable) {
      return (
        <Card
          asChild
          className={classes}
          ref={ref as unknown as Ref<HTMLDivElement>}
        >
          <li {...rest} />
        </Card>
      );
    }

    return <li ref={ref} className={cl('ds-card', classes)} {...rest} />;
  },
);

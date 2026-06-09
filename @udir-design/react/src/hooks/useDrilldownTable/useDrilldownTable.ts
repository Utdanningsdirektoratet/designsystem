import { useEffect, useId } from 'react';
import type { RefObject } from 'react';

/**
 * Automatically manages accessible level descriptions for drilldown /
 * tree-structured table rows.
 *
 * For each `<tr>` with a `data-level` attribute inside the referenced `<tbody>`,
 * this hook:
 * - Injects a visually hidden `<span>` with the level description into the
 *   first `<th>`.
 * - Sets `aria-describedby` on the `<button>` inside the `<th>` (expandable
 *   rows) or on the `<th>` itself (leaf rows).
 *
 * The level text ("Nivå 1", "Level 1", etc.) is CSS-driven and respects the
 * `lang` attribute on ancestor elements.
 *
 * Row IDs are taken from the row's own `id` attribute when present; otherwise
 * a stable generated ID is used.
 *
 * @example
 * const tbodyRef = useRef<HTMLTableSectionElement>(null);
 * useDrilldownTable(tbodyRef);
 *
 * <Table.Body ref={tbodyRef}>
 *   <Table.Row id="row-1" data-level={1}>
 *     <Table.HeaderCell scope="row">
 *       <button aria-expanded={isOpen} onClick={toggle}>Label</button>
 *     </Table.HeaderCell>
 *   </Table.Row>
 * </Table.Body>
 */
export function useDrilldownTable(
  ref: RefObject<HTMLTableSectionElement | null>,
): void {
  const idPrefix = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tbody: HTMLTableSectionElement = el;

    const generatedIds = new WeakMap<Element, string>();
    const injectedDescriptions = new WeakMap<
      HTMLTableRowElement,
      HTMLSpanElement
    >();
    let counter = 0;

    const getLevelPrefix = (): string =>
      getComputedStyle(tbody)
        .getPropertyValue('--udsc-table-level-prefix')
        .trim() || 'Nivå';

    let levelPrefix = getLevelPrefix();

    function getRowId(row: HTMLTableRowElement): string {
      if (row.id) return row.id;
      let id = generatedIds.get(row);
      if (!id) {
        id = `${idPrefix}-row-${counter++}`;
        generatedIds.set(row, id);
      }
      return id;
    }

    function processRow(row: HTMLTableRowElement): void {
      const level = row.getAttribute('data-level');
      const th = row.querySelector<HTMLElement>('th');
      if (!th) return;

      let levelDescription = injectedDescriptions.get(row);

      if (!level) {
        // data-level removed: clean up injected elements
        levelDescription?.remove();
        th.removeAttribute('aria-describedby');
        th.querySelector('button')?.removeAttribute('aria-describedby');
        return;
      }

      const descriptionId = `${getRowId(row)}-level`;

      if (!levelDescription) {
        levelDescription = document.createElement('span');
        levelDescription.className = 'ds-sr-only';
        // aria-hidden keeps the span out of the normal reading flow.
        // It is still included when resolved via aria-describedby.
        levelDescription.setAttribute('aria-hidden', 'true');
        th.appendChild(levelDescription);
        injectedDescriptions.set(row, levelDescription);
      }

      levelDescription.id = descriptionId;
      levelDescription.textContent = `${levelPrefix} ${level}`;

      const button = th.querySelector<HTMLButtonElement>('button');
      if (button) {
        // Expandable rows: aria-describedby goes on the button, not the th,
        // otherwise it wouldn't be read when the button receives focus.
        button.setAttribute('aria-describedby', descriptionId);
        th.removeAttribute('aria-describedby');
      } else {
        // Leaf rows: aria-describedby goes on the th, not a child span,
        // since VoiceOver doesn't read it when set on a child element.
        th.setAttribute('aria-describedby', descriptionId);
      }
    }

    const processAllRows = (): void =>
      tbody
        .querySelectorAll<HTMLTableRowElement>('tr[data-level]')
        .forEach(processRow);

    // Initial pass over all pre-existing rows
    processAllRows();

    // Watches for rows being added to or removed from the tbody,
    // and for data-level attribute changes on existing rows.
    const observer = new MutationObserver((mutations) => {
      const rowsToProcess = new Set<HTMLTableRowElement>();

      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.target === tbody) {
          // A row was added to or removed from the tbody.
          // Mutations from injected description elements are excluded
          // because their MutationRecord.target is the th, not the tbody.

          mutation.addedNodes.forEach((node) => {
            if (
              node instanceof HTMLTableRowElement &&
              node.hasAttribute('data-level')
            ) {
              rowsToProcess.add(node);
            }
          });
        } else if (
          mutation.type === 'attributes' &&
          mutation.target instanceof HTMLTableRowElement &&
          mutation.attributeName === 'data-level'
        ) {
          // The data-level attribute changed on a row, so re-process it.
          rowsToProcess.add(mutation.target);
        }
      }

      rowsToProcess.forEach(processRow);
    });

    observer.observe(tbody, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-level'],
    });

    // Re-runs when the lang attribute changes on any ancestor element,
    // so level labels stay in sync with the page language.
    const langObserver = new MutationObserver(() => {
      levelPrefix = getLevelPrefix();
      processAllRows();
    });

    langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
      subtree: true,
    });

    return () => {
      observer.disconnect();
      langObserver.disconnect();
    };
  }, [idPrefix, ref]);
}

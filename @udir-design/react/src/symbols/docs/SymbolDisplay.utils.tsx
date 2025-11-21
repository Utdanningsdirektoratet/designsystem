import Fuse from 'fuse.js';
import meta from '@udir-design/symbols/metadata';
import type { UdirSymbol as USymbol } from '@udir-design/symbols/metadata';

export type UdirSymbol = USymbol & {
  category_no: string;
};

export const symbols: UdirSymbol[] = Object.values(meta).map((x) => ({
  ...x,
  category_no: x.category,
}));

export const symbolsByBaseName: Record<string, UdirSymbol[]> = symbols.reduce(
  (acc, symbol) => {
    const base = symbol.sub_category;
    if (!acc[base]) acc[base] = [];
    acc[base].push(symbol);
    return acc;
  },
  {} as Record<string, UdirSymbol[]>,
);

const DISPLAY_STYLES = new Set(['Fill', 'Grønn', 'Hudtone 1']);

const shouldShowInGrid = (symbol: UdirSymbol) =>
  DISPLAY_STYLES.has(symbol.variant);

export function categorizeSymbols(symbols: UdirSymbol[]): {
  category: string;
  symbols: UdirSymbol[];
}[] {
  const filtered = symbols.filter(shouldShowInGrid);

  const categoryMap = new Map<string, UdirSymbol[]>();

  for (const symbol of filtered) {
    const categoryKey = symbol.category_no;
    const list = categoryMap.get(categoryKey);

    if (!list) {
      categoryMap.set(categoryKey, [symbol]);
    } else {
      list.push(symbol);
    }
  }

  return Array.from(categoryMap.entries())
    .map(([category, _symbols]) => ({ category, symbols: _symbols }))
    .sort((a, b) => a.category.localeCompare(b.category));
}

/* --------------------------- Fuse search config --------------------------- */
function fuseSearch(symbols: UdirSymbol[]) {
  return new Fuse(symbols, {
    threshold: 0.2,
    keys: [
      { name: 'name', weight: 3 },
      { name: 'category_no', weight: 2 },
      { name: 'category', weight: 2 },
      { name: 'sub_category', weight: 2 },
      { name: 'keywords', weight: 3 },
      { name: 'variant', weight: 1 },
    ],
    shouldSort: false,
  });
}

export function searchSymbols({ query }: { query: string }) {
  const searchSymbols = fuseSearch(symbols);

  if (!query) {
    return symbols;
  }

  return searchSymbols.search(query).map((result) => result.item);
}

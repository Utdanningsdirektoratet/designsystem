import Fuse from 'fuse.js';
import type { AkselIcon } from '@udir-design/icons/metadata';
import meta from '@udir-design/icons/metadata';
import { Translations } from './Translations';
import type { DoDont } from './UdirPreferredIcons';
import { guidelinesRecord, udirPreferredIcons } from './UdirPreferredIcons';

export type UdirIcon = AkselIcon & {
  category_no: string;
  oftenUsed: boolean;
  guidelines?: DoDont[];
};

export const strokeIcons: UdirIcon[] = Object.values(meta)
  .filter((x) => x.variant.toLowerCase() === 'stroke')
  .map((x) => ({
    ...x,
    category_no: Translations[x.category],
    oftenUsed: false,
  }));

/* Some icons are mistakenly labeled with "filled", so we need to handle both "fill" and "filled" */
export const fillIcons: UdirIcon[] = Object.values(meta)
  .filter(
    (iconMetadata, _, iconArray) =>
      iconMetadata.variant.toLowerCase().startsWith('fill') ||
      noFill(iconMetadata, iconArray),
  )
  .map((x) => ({
    ...x,
    category_no: Translations[x.category],
    oftenUsed: false,
  }));

/**
 * For icons with no fill variant, we want to show the stroke variant
 * instead of the fill variant.
 */
function noFill(icon: AkselIcon, icons: AkselIcon[]) {
  const foundFill = icons.find((x) => {
    if (x.name.endsWith('Fill') || x.name.endsWith('Filled')) {
      return (
        x.name.replace('Fill', '') === icon.name ||
        x.name.replace('Filled', '') === icon.name
      );
    }
    return false;
  });

  return !foundFill;
}

export function categorizeIcons(icons: UdirIcon[]): {
  category: string;
  icons: UdirIcon[];
}[] {
  const categoryMap = new Map<string, UdirIcon[]>();
  for (const icon of icons) {
    const oftenUsed = udirPreferredIcons.includes(
      icon.name.replace('Fill', '') || icon.name.replace('Filled', ''),
    );
    const guidelines = guidelinesRecord[icon.name];

    const extendedIcon = { ...icon, oftenUsed, guidelines };

    const category = categoryMap.get(icon.category_no);

    if (!category) {
      categoryMap.set(icon.category_no, [extendedIcon]);
    } else {
      category.push(extendedIcon);
    }
  }

  return Array.from(categoryMap.entries())
    .map(([category, _icons]) => ({ category, icons: _icons }))
    .sort((a, b) => a.category.localeCompare(b.category));
}

export function getUdirPreferredIcons(
  categoriesWithIcons: { category: string; icons: UdirIcon[] }[],
): {
  category: string;
  icons: UdirIcon[];
}[] {
  const categoryMap = new Map<string, UdirIcon[]>();
  for (const category of categoriesWithIcons) {
    for (const icon of category.icons) {
      const category = categoryMap.get('Foretrukket hos Udir');
      if (icon.oftenUsed) {
        if (!category) {
          categoryMap.set('Foretrukket hos Udir', [icon]);
        } else {
          category.push(icon);
        }
      }
    }
  }

  return Array.from(categoryMap.entries()).map(([category, _icons]) => ({
    category,
    icons: _icons.sort((a, b) => a.name.localeCompare(b.name)),
  }));
}

/* --------------------------- Fuse search config --------------------------- */
function fuseSearch(icons: UdirIcon[]) {
  return new Fuse(icons, {
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

const strokeIconSearch = fuseSearch(strokeIcons);
const fillIconSearch = fuseSearch(fillIcons);

export function searchIcons({
  toggle,
  query,
}: {
  query: string;
  toggle: 'stroke' | 'fill';
}) {
  const icons = toggle === 'stroke' ? strokeIcons : fillIcons;
  const fuse = toggle === 'stroke' ? strokeIconSearch : fillIconSearch;

  if (!query) {
    return icons;
  }

  return fuse.search(query).map((result) => result.item);
}

import type { TagProps } from 'src/components/tag';

type RootCategory = {
  label: string;
  /** Icon name, see `SidebarIcon` in `manager.tsx`. */
  icon: string;
};

/**
 * Display names for the sidebar's root categories, keyed by root ID. Also used
 * for the category shown in search results.
 */
const rootCategories: Partial<Record<string, RootCategory>> = {
  introduksjon: { label: 'Introduksjon', icon: 'informationSquare' },
  iconsandsymbols: { label: 'Ikoner og symboler', icon: 'image' },
  demo: { label: 'Demosider', icon: 'rectangleSections' },
  'design-tokens': { label: 'Design tokens', icon: 'token' },
  patterns: { label: 'Bruksmønstre', icon: 'layers' },
  components: { label: 'Komponenter', icon: 'component' },
  hooks: { label: 'Hooks', icon: 'puzzlePiece' },
  utilities: { label: 'Hjelpeverktøy', icon: 'wrench' },
};

/**
 * Looks up the root category of a Storybook title such as `components/Button`,
 * or of a root ID such as `components`. Root IDs are the lowercased first title
 * segment, since none of our roots contain characters that Storybook would
 * replace in an ID.
 */
export function getRootCategory(
  titleOrRootId: string,
): RootCategory | undefined {
  return rootCategories[titleOrRootId.split('/')[0].toLowerCase()];
}

/** All root categories, for styles that need one rule per category. */
export function getRootCategories(): RootCategory[] {
  return Object.values(rootCategories).filter(
    (category) => category !== undefined,
  );
}

export type TierBadge = {
  text: string;
  color: NonNullable<TagProps['data-color']>;
};

const tierBadges = {
  alpha: { text: 'Alpha', color: 'danger' },
  beta: { text: 'Beta', color: 'warning' },
} satisfies Record<string, TierBadge>;

/** Returns the badge for the first tier tag (`alpha` or `beta`) in `tags`. */
export function getTierBadge(tags: readonly string[]): TierBadge | undefined {
  const tier = tags.find((tag) => Object.hasOwn(tierBadges, tag));
  return tier ? tierBadges[tier as keyof typeof tierBadges] : undefined;
}

/** All tier badges, for markup that needs one branch per tier. */
export function getTierBadges(): TierBadge[] {
  return Object.values(tierBadges);
}

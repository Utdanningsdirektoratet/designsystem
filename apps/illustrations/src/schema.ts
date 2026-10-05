import { z } from 'zod';

export const categories = [
  { id: 'barnehage', label: 'Barnehage' },
  { id: 'grunnskole', label: 'Grunnskole' },
  { id: 'videregaende-opplaering', label: 'Videregående opplæring' },
  { id: 'voksen-og-generell', label: 'Voksen og generell' },
  { id: 'internbruk', label: 'Internbruk' },
] as const;
export type CategoryId = (typeof categories)[number]['id'];

// A category without a source has no reviewed Figma page yet; never guess page IDs.
// idPrefix keeps generated identities unique across Figma files.
export const sources: Partial<
  Record<CategoryId, { fileKey: string; pageNodeId: string; idPrefix: string }>
> = {
  barnehage: {
    fileKey: 'QeYBL9fzDCk87WNWcDSQi7',
    pageNodeId: '243:57165',
    idPrefix: '',
  },
};

export function getSource(categoryId: string) {
  const source = sources[categoryId as CategoryId];
  if (!source)
    throw new Error(
      `Category "${categoryId}" has no configured Figma source. Known sources: ${Object.keys(sources).join(', ')}.`,
    );
  return source;
}

export function isCategoryId(value: string): value is CategoryId {
  return categories.some((category) => category.id === value);
}

export const categoryIds = categories.map(({ id }) => id) as [
  CategoryId,
  ...CategoryId[],
];

const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const nodeId = z.string().regex(/^\d+:\d+$/);
const name = z.string().trim().min(1);
const variantSchema = z.strictObject({
  id,
  nodeId,
  name,
  width: z.number().positive(),
  height: z.number().positive(),
  properties: z.record(z.string().min(1), z.string()),
  svg: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*\.svg$/),
});
const familySchema = z.strictObject({
  id,
  categoryId: z.enum(categoryIds),
  nodeId,
  name,
  variants: z.array(variantSchema).min(1),
});

export const catalogSchema = z
  .strictObject({
    schemaVersion: z.literal(2),
    state: z.enum(['pending-import', 'imported']),
    families: z.array(familySchema),
  })
  .superRefine((catalog, context) => {
    if (
      (catalog.state === 'pending-import') !==
      (catalog.families.length === 0)
    ) {
      context.addIssue({
        code: 'custom',
        message:
          'Pending catalogs must be empty; imported catalogs must contain families.',
      });
    }
    const identities = new Set<string>();
    const nodes = new Set<string>();
    const filenames = new Set<string>();
    for (const family of catalog.families) {
      for (const [kind, value] of [
        ['family', family.id],
        ['family-node', `${family.categoryId}:${family.nodeId}`],
      ]) {
        const key = `${kind}:${value}`;
        if (identities.has(key))
          context.addIssue({ code: 'custom', message: `Duplicate ${key}` });
        identities.add(key);
      }
      for (const variant of family.variants) {
        if (
          identities.has(`variant:${variant.id}`) ||
          nodes.has(`${family.categoryId}:${variant.nodeId}`) ||
          filenames.has(variant.svg)
        ) {
          context.addIssue({
            code: 'custom',
            message: `Duplicate variant identity, export node or filename: ${variant.id}`,
          });
        }
        identities.add(`variant:${variant.id}`);
        nodes.add(`${family.categoryId}:${variant.nodeId}`);
        filenames.add(variant.svg);
        if (variant.svg !== `${variant.id}.svg`)
          context.addIssue({
            code: 'custom',
            message: 'SVG filename must match stable variant ID.',
          });
        if (
          Math.round(variant.width * 2) < 1 ||
          Math.round(variant.height * 2) < 1
        ) {
          context.addIssue({
            code: 'custom',
            message: 'Frame bounds must round to positive 2x dimensions.',
          });
        }
      }
    }
  });

const mappedVariantSchema = variantSchema
  .omit({
    width: true,
    height: true,
    svg: true,
  })
  .extend({ componentId: nodeId.optional() });
export const importMapSchema = z
  .strictObject({
    schemaVersion: z.literal(2),
    state: z.enum(['pending-review', 'reviewed']),
    families: z.array(
      familySchema.extend({ variants: z.array(mappedVariantSchema).min(1) }),
    ),
  })
  .superRefine((mapping, context) => {
    if (mapping.state !== 'reviewed' || mapping.families.length === 0) {
      context.addIssue({
        code: 'custom',
        message:
          'Inspect inventory and explicitly review a nonempty import mapping first.',
      });
    }
  });

export type IllustrationCatalog = z.infer<typeof catalogSchema>;
export type IllustrationFamily = IllustrationCatalog['families'][number];
export type IllustrationVariant = IllustrationFamily['variants'][number];
export type ImportMap = z.infer<typeof importMapSchema>;

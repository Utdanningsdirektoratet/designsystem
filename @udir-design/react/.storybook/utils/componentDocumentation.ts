import * as fs from 'node:fs';
import * as path from 'node:path';
import { tiers } from '../../tiers.js';

const root = path.resolve(import.meta.dirname, '../..');

export const componentCategoryOrder = [
  'Skjema',
  'Navigasjon',
  'Handlinger',
  'Data og filtrering',
  'Tilbakemeldinger og status',
  'Innhold',
  'Profil og layout',
] as const;

export type ComponentCategory = (typeof componentCategoryOrder)[number];
type ComponentCategories = readonly [ComponentCategory, ...ComponentCategory[]];

export type ComponentDocumentationEntry = {
  categories: ComponentCategories;
  docsId: string;
  name: string;
};

const componentCategories: Record<string, ComponentCategories> = {
  alert: ['Tilbakemeldinger og status'],
  avatar: ['Profil og layout'],
  badge: ['Tilbakemeldinger og status'],
  breadcrumbs: ['Navigasjon'],
  button: ['Handlinger'],
  card: ['Innhold'],
  checkbox: ['Skjema', 'Data og filtrering'],
  chip: ['Data og filtrering', 'Handlinger'],
  demoBanner: ['Tilbakemeldinger og status'],
  details: ['Innhold'],
  dialog: ['Tilbakemeldinger og status'],
  divider: ['Profil og layout'],
  dropdown: ['Handlinger', 'Navigasjon'],
  errorSummary: ['Tilbakemeldinger og status', 'Skjema'],
  field: ['Skjema'],
  fieldNecessity: ['Skjema'],
  fieldset: ['Skjema'],
  fileUpload: ['Skjema'],
  footer: ['Profil og layout', 'Navigasjon'],
  formNavigation: ['Skjema', 'Navigasjon'],
  formSummary: ['Skjema', 'Navigasjon'],
  header: ['Profil og layout', 'Navigasjon'],
  input: ['Skjema'],
  link: ['Navigasjon'],
  list: ['Data og filtrering', 'Innhold'],
  logo: ['Profil og layout'],
  pagination: ['Data og filtrering', 'Navigasjon'],
  popover: ['Innhold'],
  progressBar: ['Tilbakemeldinger og status', 'Skjema'],
  radio: ['Skjema', 'Data og filtrering'],
  readMore: ['Innhold', 'Skjema'],
  search: ['Data og filtrering', 'Navigasjon'],
  select: ['Skjema', 'Data og filtrering'],
  skeleton: ['Tilbakemeldinger og status'],
  skipLink: ['Navigasjon'],
  spinner: ['Tilbakemeldinger og status'],
  suggestion: ['Skjema', 'Data og filtrering'],
  switch: ['Skjema', 'Data og filtrering'],
  table: ['Data og filtrering', 'Innhold'],
  tableOfContents: ['Navigasjon'],
  tabs: ['Navigasjon'],
  tag: ['Tilbakemeldinger og status', 'Data og filtrering'],
  textarea: ['Skjema'],
  textfield: ['Skjema'],
  toggleGroup: ['Data og filtrering'],
  tooltip: ['Tilbakemeldinger og status'],
  typography: ['Innhold'],
};

/** Grouped exports such as typography/heading share their group documentation page. */
function getPublishedComponentNames(): string[] {
  return [
    ...new Set(
      Object.values(tiers).flatMap((entries) => [
        ...entries.components,
        ...entries.groupedComponents.map(({ group }) => group),
      ]),
    ),
  ];
}

function validateCategories(publishedNames: string[]): void {
  const publishedNameSet = new Set(publishedNames);
  const uncategorizedComponents = [...publishedNames].filter(
    (name) => componentCategories[name] === undefined,
  );
  const unpublishedCategories = Object.keys(componentCategories).filter(
    (name) => !publishedNameSet.has(name),
  );
  const errors = [
    uncategorizedComponents.length > 0 &&
      `Missing categories for: ${uncategorizedComponents.join(', ')}`,
    unpublishedCategories.length > 0 &&
      `Categories without published components: ${unpublishedCategories.join(', ')}`,
  ].filter(Boolean);

  if (errors.length > 0) {
    throw new Error(errors.join('. '));
  }
}

function getDocumentationName(componentName: string): string {
  const componentDirectory = path.join(root, 'src/components', componentName);
  const documentationFiles = fs
    .readdirSync(componentDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'));

  if (documentationFiles.length !== 1) {
    throw new Error(
      `Expected exactly one documentation page for component group "${componentName}", found ${documentationFiles.length}`,
    );
  }

  return path.basename(documentationFiles[0].name, '.mdx');
}

/** Builds one entry per component documentation page from the lifecycle barrels. */
export function buildComponentDocumentationManifest(): ComponentDocumentationEntry[] {
  const publishedNames = getPublishedComponentNames();
  validateCategories(publishedNames);

  return publishedNames
    .map((name) => ({
      categories: componentCategories[name],
      docsId: `components-${name.toLowerCase()}--docs`,
      name: getDocumentationName(name),
    }))
    .sort(
      (a, b) =>
        componentCategoryOrder.indexOf(a.categories[0]) -
          componentCategoryOrder.indexOf(b.categories[0]) ||
        a.name.localeCompare(b.name, 'nb'),
    );
}

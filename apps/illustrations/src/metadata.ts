import catalog from '../source/catalog/metadata.json';
import { catalogSchema, categories } from './schema.js';

export const metadata = catalogSchema.parse(catalog);
export { categories };
export const families = metadata.families;
export type {
  CategoryId,
  IllustrationCatalog,
  IllustrationFamily,
  IllustrationVariant,
} from './schema.js';

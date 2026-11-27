import type { Options } from 'yargs';
import { sources } from '../src/schema.ts';
import type { CategoryId } from '../src/schema.ts';

/** The categories with a reviewed Figma page, which the scripts can import. */
export const sourcedCategoryIds = Object.keys(sources) as CategoryId[];

/** The `--category` option, so yargs rejects a category without a Figma page before any request. */
export const categoryOption = {
  description: 'Only this category',
  type: 'string',
  choices: sourcedCategoryIds,
} as const satisfies Options;

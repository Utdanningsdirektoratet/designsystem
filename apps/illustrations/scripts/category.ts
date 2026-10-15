import { getSource, isCategoryId } from '../src/schema.ts';
import type { CategoryId } from '../src/schema.ts';

// Fails before any network or file access when the category or its source is missing.
export function parseCli(args: string[], flags: string[] = []) {
  let categoryId: string | undefined;
  const given: string[] = [];
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === '--category') categoryId = args[++index];
    else if (arg.startsWith('--category=')) categoryId = arg.slice(11);
    else if (flags.includes(arg)) given.push(arg);
    else throw new Error(`Unsupported argument: ${arg}.`);
  }
  if (!categoryId || !isCategoryId(categoryId))
    throw new Error(
      'Pass --category=<category id>, for example --category=barnehage.',
    );
  return {
    categoryId: categoryId as CategoryId,
    source: getSource(categoryId),
    flags: given,
  };
}

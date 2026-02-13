import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PublishedComponent } from '@figma/rest-api-spec';
import { dump } from 'js-yaml';
import { upperFirst } from 'lodash-es';
import { resolveName } from './symbol-name';

export type SymbolYml = {
  name: string;
  category: string;
  sub_category: string;
  keywords: string[];
  variant: string;
  created_at: string;
};

export const makeConfig = (
  symbols: PublishedComponent[],
  dirLocation: string,
) => {
  console.group('Creating symbol yml...');

  let counter = 0;
  for (const symbol of symbols) {
    const name = resolveName(symbol).replace('.svg', '');
    const keywords = symbol.description
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean);

    if (!symbol.containing_frame?.pageName || !symbol.containing_frame?.name) {
      throw new Error(
        `Missing containing_frame.pageName or containing_frame.name for symbol ${name}`,
      );
    }

    const config: SymbolYml = {
      name,
      category: symbol.containing_frame.pageName,
      sub_category: upperFirst(symbol.containing_frame.name),
      keywords: keywords.length > 0 ? keywords : [name],
      variant: upperFirst(
        symbol.name.includes('Style=') ? symbol.name.replace('Style=', '') : '',
      ),
      created_at: new Date(symbol.created_at)
        .toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('.'),
    };

    const yml = dump(config, {
      noRefs: true,
      skipInvalid: false,
      quotingType: '"',
    });

    writeFileSync(resolve(dirLocation, `${config.name}.yml`), yml, {
      encoding: 'utf8',
    });
    counter++;
  }

  console.info(`Created ${counter} symbol yml files`);
  console.groupEnd();
};

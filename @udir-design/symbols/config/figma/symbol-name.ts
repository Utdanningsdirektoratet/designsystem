import { PublishedComponent } from '@figma/rest-api-spec';
import { upperFirst } from 'lodash-es';

export const resolveName = (icon: PublishedComponent) => {
  const variant = icon.name.replace('Style=', '').trim();
  const actualName = icon.containing_frame?.containingComponentSet?.name;
  const pascal = pascalPreserve(`${actualName} ${variant}`);
  return `${pascal}.svg`;
};

const pascalPreserve = (str: string) =>
  str
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .split(/\s+/)
    .map(upperFirst)
    .join('');

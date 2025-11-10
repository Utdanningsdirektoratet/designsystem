import { PublishedComponent } from '@figma/rest-api-spec';
import { camelCase, startCase } from 'lodash-es';

export const resolveName = (icon: PublishedComponent) => {
  const variant = icon.name.replace('Style=', '');
  const finalVariant = variant.toLocaleLowerCase() !== 'outline' ? variant : '';
  const actualName = icon.containing_frame?.containingComponentSet?.name;
  const name = `${actualName}${finalVariant}`;
  return `${startCase(camelCase(name)).replace(/ /g, '')}.svg`;
};

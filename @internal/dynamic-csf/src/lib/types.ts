import { StoryObj, Meta } from '@storybook/react';
import { ComponentProps, ComponentType } from 'react';
import { CartesianInput } from './cartesian';

type RequiredAndNonNullable<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

type RequireKeys<T, K extends keyof T> = T & RequiredAndNonNullable<Pick<T, K>>;

export interface GeneratorSpecificMeta<
  TComponent extends ComponentType,
  Story extends StoryObj<TComponent> = StoryObj<TComponent>,
> {
  /**
   * Path to the file where the primary component is found.
   *
   * This is used to extract TypeScript type information for the component for use when generating variants
   */
  componentPath: `${string}.ts` | `${string}.tsx`;
  /**
   * The base story, which all generated stories extend
   */
  baseStory: Story;
  /**
   * Automatically generate variants for these props, in this order.
   * Story variants names also depend on the order.
   *
   * Requires the prop type to be finite and known at compile-time, unless its variants
   * are provided in `definedVariants`
   */
  variantProps: Array<keyof ComponentProps<TComponent>>;
  /**
   * Allows you to predefine variants for some props, which is useful when variants can't
   * be known at compile-time. E.g. if the prop can be an arbitrary string.
   */
  definedVariants?: CartesianInput<ComponentProps<TComponent>>;
  /**
   * Allows you to generate more than one story for each set of variant props.
   * @param story The baseStory with generated variant props applied
   * @returns an object with additional stories, where each key is suffixed to the generated variant story name
   */
  deriveStories?: (story: Story) => Record<string, Story>;
}

// This block of code ensures that we later can strip away all our extensions
// to the Meta object in the generated CSF
type GeneratorSpecificFields = keyof GeneratorSpecificMeta<ComponentType>;
const _generatorSpecificFields = [
  'baseStory',
  'componentPath',
  'definedVariants',
  'deriveStories',
  'variantProps',
] as const satisfies GeneratorSpecificFields[];
type GeneratorSpecificFieldsTuple =
  GeneratorSpecificFields extends (typeof _generatorSpecificFields)[number]
    ? typeof _generatorSpecificFields
    : never;
// If one of the fields unique to GeneratorMeta is missing from the _generatorSpecificFields
// definition above, RequiredMetadataFieldsTuple will be of type 'never' and the
// generatorSpecificFields definition will give a compiler error.
export const generatorSpecificFields: GeneratorSpecificFieldsTuple =
  _generatorSpecificFields;

/**
 * Metadata to configure dynamic generation of stories for a component.
 */
export type GeneratorMeta<
  TComponent extends ComponentType = ComponentType,
  Story extends StoryObj<TComponent> = StoryObj<TComponent>,
> = GeneratorSpecificMeta<TComponent, Story> &
  RequireKeys<Meta<ComponentProps<TComponent>>, 'component'>;

// This block of code ensures that we later can check the presence of ALL required fields
type RequiredFieldsOnly<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};
type RequiredMetadataFields = keyof RequiredFieldsOnly<
  GeneratorMeta<ComponentType>
>;
const _requiredFields = [
  'baseStory',
  'component',
  'componentPath',
  'variantProps',
] as const satisfies RequiredMetadataFields[];
type RequiredMetadataFieldsTuple =
  RequiredMetadataFields extends (typeof _requiredFields)[number]
    ? typeof _requiredFields
    : never;
// If one of the required fields is missing from the _requiredFields definition above,
// RequiredMetadataFieldsTuple will be of type 'never' and the requiredFields definition
// will give a compiler error.
export const requiredMetaFields: RequiredMetadataFieldsTuple = _requiredFields;

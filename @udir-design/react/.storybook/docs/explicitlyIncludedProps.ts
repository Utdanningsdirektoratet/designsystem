import type { ComponentPropsWithoutRef } from 'react';
import type { ComponentType } from 'react';
// eslint-disable-next-line no-restricted-imports
import type * as alphaComponents from '../../src/components/alpha';
// eslint-disable-next-line no-restricted-imports
import type * as betaComponents from '../../src/components/beta';
// eslint-disable-next-line no-restricted-imports
import type * as stableComponents from '../../src/components/stable';

type ComponentExports = typeof alphaComponents &
  typeof betaComponents &
  typeof stableComponents;

// Remove the exports that aren't usable as components. E.g. FileUpload isn't a component,
// only its children .Trigger, .Dropzone and .Item are components.
type Components = {
  [K in keyof ComponentExports as ComponentExports[K] extends ComponentType<never>
    ? K
    : never]: ComponentExports[K];
};

// TODO is it better to remove this whitelist, and always use the pattern shown in FakeChipCheckbox instead?
// When adding `ChipCheckbox: ['onChange']` to the list below, it for some reason showed up with the
// incorrect type `ChangeHandler<HTMLButtonElement>` But "redefining" the prop with
//   { onChange?: ChipCheckboxProps['onChange'] }
// in FakeChipCheckbox made the correct type show up...
export const explicitlyIncludedProps: Record<string, string[] | undefined> = {
  /* Here we can choose to include specific props which would otherwise be filtered out –
   * e.g. due to being defined in third-party dependencies like React – for specific components.
   *
   * Note: this doesn't work for the `children` prop due to how react-docgen-typescript works internally.
   * To include `children`, you must explicitly define it on the prop type of the component.
   */
} satisfies {
  // Ensure keys must be names of components in the library, and each value must be an array
  // of prop names that are valid for that specific component
  [K in keyof Components]?: Array<
    keyof ComponentPropsWithoutRef<Components[K]>
  >;
};

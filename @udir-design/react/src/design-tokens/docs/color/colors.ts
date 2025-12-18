import type { Color, SeverityColors } from '@digdir/designsystemet-types';

export type ColorInfo = {
  name: string;
  description?: string;
  semantics: {
    name: string;
    shades: {
      name: string;
      value: string;
    }[];
  }[];
};

export type ColorValue = {
  main?: boolean;
  name: string;
  value: string;
};

function makeColorScale(color: Color | SeverityColors) {
  return [
    {
      name: 'Background',
      shades: [
        {
          name: 'Default',
          value: `var(--ds-color-${color}-background-default)`,
        },
        { name: 'Tinted', value: `var(--ds-color-${color}-background-tinted)` },
      ],
    },
    {
      name: 'Surface',
      shades: [
        { name: 'Default', value: `var(--ds-color-${color}-surface-default)` },
        { name: 'Tinted', value: `var(--ds-color-${color}-surface-tinted)` },
        { name: 'Hover', value: `var(--ds-color-${color}-surface-hover)` },
        { name: 'Active', value: `var(--ds-color-${color}-surface-active)` },
      ],
    },
    {
      name: 'Border',
      shades: [
        { name: 'Subtle', value: `var(--ds-color-${color}-border-subtle)` },
        { name: 'Default', value: `var(--ds-color-${color}-border-default)` },
        { name: 'Strong', value: `var(--ds-color-${color}-border-strong)` },
      ],
    },
    {
      name: 'Text',
      shades: [
        { name: 'Subtle', value: `var(--ds-color-${color}-text-subtle)` },
        { name: 'Default', value: `var(--ds-color-${color}-text-default)` },
      ],
    },
    {
      name: 'Base',
      shades: [
        { name: 'Default', value: `var(--ds-color-${color}-base-default)` },
        { name: 'Hover', value: `var(--ds-color-${color}-base-hover)` },
        { name: 'Active', value: `var(--ds-color-${color}-base-active)` },
        {
          name: 'Contrast subtle',
          value: `var(--ds-color-${color}-base-contrast-subtle)`,
        },
        {
          name: 'Contrast default',
          value: `var(--ds-color-${color}-base-contrast-default)`,
        },
      ],
    },
  ];
}

export const brandColors: ColorInfo[] = [
  {
    name: 'Accent',
    description: 'Accent er basert på Udir grønn.',
    semantics: makeColorScale('accent'),
  },
  {
    name: 'Neutral',
    description: 'Neutral er basert på Udir sort.',
    semantics: makeColorScale('neutral'),
  },
  {
    name: 'Support1',
    description: 'Support1 er basert på Udir blå.',
    semantics: makeColorScale('support1'),
  },
  {
    name: 'Support2',
    description: 'Support2 er basert på Udir brun.',
    semantics: makeColorScale('support2'),
  },
];

export const severityColors: ColorInfo[] = [
  {
    name: 'Info',
    semantics: makeColorScale('info'),
  },
  {
    name: 'Success',
    semantics: makeColorScale('success'),
  },
  {
    name: 'Warning',
    semantics: makeColorScale('warning'),
  },
  {
    name: 'Danger',
    semantics: makeColorScale('danger'),
  },
];

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

// TODO: Update when data visualization colors are added as tokens
export const datavisColors: { number: string; value: string }[] = [
  { number: '1', value: '#5BA27E' },
  { number: '2', value: '#6C7C94' },
  { number: '3', value: '#BB893E' },
  { number: '4', value: '#353535' },
  { number: '5', value: '#30A1BB' },
  { number: '6', value: '#255F41' },
  { number: '7', value: '#9D5F32' },
  { number: '8', value: '#949494' },
];

export const datavisSeqMonoColors: string[] = [
  '#5BA27E',
  '#427C5E',
  '#36674E',
  '#254B38',
  '#1E422F',
  '#163626',
  '#112E1F',
  '#0B1E15',
];

export const datavisSeqDivergentColors: string[] = [
  '#1E422F',
  '#36674E',
  '#5BA27E',
  '#DEDEDE',
  '#6C7C94',
  '#485970',
  '#2E3C51',
];

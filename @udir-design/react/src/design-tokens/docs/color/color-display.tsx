import { Heading } from '../../../components/typography/heading/Heading';
import { Paragraph } from '../../../components/typography/paragraph/Paragraph';

type Color = {
  name: string;
  semantics?: ColorGroup[];
  value?: string;
};

type ColorGroup = {
  name: string;
  shades: ColorValue[];
};

type ColorValue = {
  main?: boolean;
  name: string;
  value: string;
};

type Props = {
  title: string;
  colorPalette: Color[];
};

export const ColorDisplay = ({ colorPalette, title }: Props) => {
  return (
    <>
      <Heading level={4}>{title}</Heading>
      <div
        style={{
          display: 'flex',
          gap: 'var(--ds-size-2)',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {colorPalette.map((color) => (
          <div style={{ width: '100%' }} key={color.value}>
            <Heading style={{ flex: 2, marginBlock: '0' }} level={5}>
              {color.name}
            </Heading>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--ds-size-5)',
                justifyContent: 'flex-start',
              }}
            >
              {color.semantics &&
                color.semantics.map((category) => (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--ds-size-2)',
                    }}
                  >
                    <Paragraph style={{ marginBlock: '0' }}>
                      {category.name}
                    </Paragraph>
                    <div style={{ display: 'flex', gap: 'var(--ds-size-1)' }}>
                      {category.shades.map((shade) => (
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <div
                            key={shade.value}
                            style={{
                              height: 'var(--ds-size-15)',
                              width: 'var(--ds-size-15)',
                              background: `${shade.value}`,
                              border:
                                'var(--ds-border-width-default) solid var(--ds-color-border-default)',
                              borderRadius: `${shade?.main ? 'var(--ds-border-radius-full)' : 'var(--ds-border-radius-default)'}`,
                            }}
                          />
                          <Paragraph
                            style={{
                              marginBlock: 'var(--ds-size-1)',
                              wordBreak: 'break-word',
                            }}
                          >
                            {shade.name}
                          </Paragraph>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const BrandColors = () => {
  return <ColorDisplay colorPalette={brandColors} title="Brand-farger" />;
};

// export const SeverityColors = () => {
//   return <ColorDisplay colorPalette={severityColors} title="Status-farger" />;
// };

export const IdentityColors = () => {
  return (
    <ColorDisplay colorPalette={identityColors} title="Identitetsfarger" />
  );
};

export const identityColors = [
  {
    name: 'Udir grønn',
    semantics: [
      {
        name: '',
        shades: [
          { name: '1', value: '#EEF8F3' },
          { name: '2', value: '#DDF1E7' },
          { name: '3', value: '#CCEADA' },
          { name: '4', value: '#BBE3CE' },
          { name: '5', value: '#A9DBC2' },
          { name: '6', value: '#9BD8B9' },
          { name: '7', main: true, value: '#76C69D' },
          { name: '8', value: '#5BA27E' },
          { name: '9', value: '#254B38' },
          { name: '10', value: '#112E1F' },
        ],
      },
    ],
  },
  {
    name: 'Udir sort',
    semantics: [
      {
        name: '',
        shades: [
          { name: 'Hvit', value: '#FFFFFF' },
          { name: '2', value: '#FBFBFB' },
          { name: '3', value: '#F4F4F4' },
          { name: '4', value: '#DEDEDE' },
          { name: '5', value: '#C4C4C4' },
          { name: '6', value: '#A0A0A0' },
          { name: '7', value: '#757575' },
          { name: '8', value: '#3D4146' },
          { name: '9', main: true, value: '#303030' },
        ],
      },
    ],
  },
  {
    name: 'Udir blå',
    semantics: [
      {
        name: '',
        shades: [
          { name: '1', value: '#EFF7FE' },
          { name: '2', value: '#E0EFFB' },
          { name: '3', value: '#D3E6F6' },
          { name: '4', value: '#C8DEF0' },
          { name: '5', value: '#BED5E8', main: true },
          { name: '6', value: '#A9C0D3' },
          { name: '7', value: '#7F99AE' },
          { name: '8', value: '#6D889D' },
          { name: '9', value: '#536D81' },
          { name: '10', value: '#2F4960' },
          { name: '11', value: '#263745' },
          { name: '12', value: '#191D24' },
        ],
      },
    ],
  },
  {
    name: 'Udir brun',
    semantics: [
      {
        name: '',
        shades: [
          { name: '1', value: '#FBF7F1' },
          { name: '2', value: '#FBF3E8' },
          { name: '3', value: '#F2E8DA' },
          { name: '4', value: '#ECDBC2' },
          { name: '5', value: '#E5CEAE', main: true },
          { name: '6', value: '#D6B689' },
          { name: '7', value: '#BFA687' },
          { name: '8', value: '#937A57' },
          { name: '9', value: '#705C40' },
          { name: '10', value: '#5E4521' },
          { name: '11', value: '#261F14' },
        ],
      },
    ],
  },
];

export const brandColors = [
  {
    name: 'accent',
    semantics: [
      {
        name: 'Background',
        shades: [
          { name: 'Default', value: '#FFFFFF' },
          { name: 'Tinted', value: '#EAF6F0' },
        ],
      },
      {
        name: 'Surface',
        shades: [
          { name: 'Default', value: '#FFFFFF' },
          { name: 'Tinted', value: '#D6EEE2' },
          { name: 'Hover', value: '#BBE3CF' },
          { name: 'Active', value: '#9DD6B9' },
        ],
      },
      {
        name: 'Border',
        shades: [
          { name: 'Subtle', value: '#81CBA5' },
          { name: 'Default', value: '#4E8368' },
          { name: 'Strong', value: '#3D6651' },
        ],
      },
      {
        name: 'Text',
        shades: [
          { name: 'Subtle', value: '#3D6651' },
          { name: 'Default', value: '#1C2F26' },
        ],
      },
      {
        name: 'Base',
        shades: [
          { name: 'Default', value: '#76C69D' },
          { name: 'Hover', value: '#68AE8A' },
          { name: 'Active', value: '#5A9778' },
          { name: 'Contrast subtle', value: '#17271F' },
          { name: 'Contrast default', value: '#000000' },
        ],
      },
    ],
  },
  // {
  //   name: 'neutral',
  //   value: 'var(--ds-color-neutral-base-default)',
  // },
  // {
  //   name: 'support1',
  //   value: 'var(--ds-color-support1-base-default)',
  // },
  // {
  //   name: 'support2',
  //   value: 'var(--ds-color-support2-base-default)',
  // },
];

// export const severityColors = [
//   {
//     name: 'info',
//     value: 'var(--ds-color-info-base-default)',
//   },
//   {
//     name: 'success',
//     value: 'var(--ds-color-success-base-default)',
//   },
//   {
//     name: 'danger',
//     value: 'var(--ds-color-danger-base-default)',
//   },
//   {
//     name: 'warning',
//     value: 'var(--ds-color-warning-base-default)',
//   },
// ];

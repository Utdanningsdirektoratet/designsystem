import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Select } from './Select';
import { Label } from '../typography/label/Label';
import { Field } from '../field/Field';

import { useState } from 'react';
import { ValidationMessage } from '../typography/validationMessage/ValidationMessage';
import { Heading } from '../typography/heading/Heading';

const meta: Meta<typeof Select> = {
  component: Select,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

type County =
  | 'Akershus'
  | 'Agder'
  | 'Buskerud'
  | 'Finnmark'
  | 'Innlandet'
  | 'Nordland'
  | 'Rogaland';
const counties: County[] = [
  'Akershus',
  'Agder',
  'Buskerud',
  'Finnmark',
  'Innlandet',
  'Nordland',
  'Rogaland',
];

export const Preview: Story = {
  args: {
    'aria-invalid': false,
    width: 'full',
    disabled: false,
    readOnly: false,
  },
  render: (args, context) => (
    <Field>
      <Label>Fylke</Label>
      <Select {...args} defaultValue="" id={context.id}>
        <Select.Option value="">Velg et fylke &hellip;</Select.Option>
        {counties.map((county) => (
          <Select.Option key={county} value={county.toLowerCase()}>
            {county}
          </Select.Option>
        ))}
      </Select>
    </Field>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    await step('The label "County" is rendered', async () => {
      const label = await waitFor(() => canvas.getByLabelText(/Fylke/i));
      expect(label).toBeInTheDocument();
    });

    await step(
      'The select element is rendered with the default value',
      async () => {
        expect(select).toBeInTheDocument();
        expect(select).toHaveValue('');
      },
    );

    await step('The select contains all expected options', async () => {
      const placeholderOption = canvas.getByRole('option', {
        name: /velg et fylke/i,
      });
      expect(placeholderOption).toBeInTheDocument();
      const everestOption = canvas.getByRole('option', {
        name: /akershus/i,
      });
      expect(everestOption).toBeInTheDocument();
    });

    await step(
      'User can select an option from the select element',
      async () => {
        await userEvent.selectOptions(select, 'akershus');
        expect(select).toHaveValue('akershus');
      },
    );
    await userEvent.keyboard('{Tab}');
  },
};

export const WithError: Story = {
  args: {
    'aria-invalid': true,
  },
  render: (args, context) => (
    <Field>
      <Label>Fylke</Label>
      <Select {...args} id={context.id}>
        <Select.Option value="">Velg et fylke &hellip;</Select.Option>
        {counties.map((county) => (
          <Select.Option key={county} value={county.toLowerCase()}>
            {county}
          </Select.Option>
        ))}
      </Select>
      <ValidationMessage>Velg et fylke</ValidationMessage>
    </Field>
  ),
};

const educationalLevels = {
  barneskole: [
    'Første',
    'Andre',
    'Tredje',
    'Fjerde',
    'Femte',
    'Sjette',
    'Syvende',
  ],
  ungdomsskole: ['Åttende', 'Niende', 'Tiende'],
  videregående: ['Vg1', 'Vg2', 'Vg3'],
};

export const WithOptgroup: Story = {
  render: (args, context) => (
    <Field>
      <Label>Klassetrinn</Label>
      <Select {...args} id={context.id}>
        <Select.Option value="">Velg klassetrinn &hellip;</Select.Option>
        {Object.entries(educationalLevels).map(([key, levels]) => (
          <Select.Optgroup
            key={key}
            label={key[0].toUpperCase() + key.slice(1)}
          >
            {levels.map((level) => (
              <Select.Option key={level} value={level.toLowerCase()}>
                {level}
              </Select.Option>
            ))}
          </Select.Optgroup>
        ))}
      </Select>
    </Field>
  ),
};

type Cities = Record<County, string[]>;
const Cities: Cities = {
  Akershus: [
    'Oslo',
    'Bærum',
    'Lillestrøm',
    'Asker',
    'Lørenskog',
    'Skedsmokorset',
    'Oppegård',
  ],
  Agder: [
    'Kristiansand',
    'Arendal',
    'Grimstad',
    'Lillesand',
    'Farsund',
    'Flekkefjord',
    'Søgne',
  ],
  Buskerud: [
    'Drammen',
    'Kongsberg',
    'Hønefoss',
    'Mjøndalen',
    'Lierbyen',
    'Ringerike',
    'Hole',
  ],
  Finnmark: [
    'Alta',
    'Hammerfest',
    'Vardo',
    'Kirkenes',
    'Kautokeino',
    'Båtsfjord',
    'Mehamn',
  ],
  Innlandet: [
    'Lillehammer',
    'Gjøvik',
    'Hamar',
    'Elverum',
    'Otta',
    'Kongsvinger',
    'Rena',
  ],
  Nordland: [
    'Bodø',
    'Narvik',
    'Mo i Rana',
    'Fauske',
    'Svolvær',
    'Stokmarknes',
    'Brønnøysund',
  ],
  Rogaland: [
    'Stavanger',
    'Sandnes',
    'Haugesund',
    'Bryne',
    'Egersund',
    'Sauda',
    'Åkrehamn',
  ],
};
type SelectedCounty = County | '';

export const Controlled: Story = {
  parameters: {
    customStyles: {
      display: 'flex',
      gap: 'var(--ds-size-4)',
      flexDirection: 'column',
    },
  },
  render: (args, context) => {
    const [selectedCounty, setSelectedCounty] = useState<SelectedCounty>('');
    const [selectedCity, setSelectedCity] = useState<string>('');

    const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newCounty = e.target.value as County;
      setSelectedCounty(newCounty);
      if (!Cities[newCounty].some((c) => c.toLowerCase() === selectedCity)) {
        setSelectedCity('');
      }
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newCity = e.target.value;
      setSelectedCity(newCity);
      const newCounty = (Object.keys(Cities) as County[]).find((f) =>
        Cities[f].some((c) => c.toLowerCase() === newCity),
      );
      if (newCounty && newCounty !== selectedCounty) {
        setSelectedCounty(newCounty);
      }
    };

    return (
      <>
        <Heading>Hvor bor du?</Heading>
        <Field>
          <Label>Fylke</Label>
          <Select
            {...args}
            id={context.id}
            value={selectedCounty}
            onChange={handleCountyChange}
          >
            <Select.Option value="">Velg et fylke &hellip;</Select.Option>
            {(Object.keys(Cities) as County[]).map((f) => (
              <Select.Option key={f} value={f}>
                {f}
              </Select.Option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label>By</Label>
          <Select
            {...args}
            id={`${context.id}-by`}
            value={selectedCity}
            onChange={handleCityChange}
          >
            <Select.Option value="">Velg en by &hellip;</Select.Option>
            {selectedCounty
              ? Cities[selectedCounty].map((city) => (
                  <Select.Option key={city} value={city.toLowerCase()}>
                    {city}
                  </Select.Option>
                ))
              : null}
          </Select>
        </Field>
      </>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: Preview.render,
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
  render: Preview.render,
};

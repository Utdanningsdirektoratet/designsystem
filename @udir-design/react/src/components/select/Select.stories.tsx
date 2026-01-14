import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import type { County } from '.storybook/data';
import { citiesPerCounty as cities, counties } from '.storybook/data';
import preview from '.storybook/preview';
import { Field } from '../field/Field';
import { Heading } from '../typography/heading/Heading';
import { Label } from '../typography/label/Label';
import { ValidationMessage } from '../typography/validationMessage/ValidationMessage';
import { Select } from './Select';

const meta = preview.meta({
  component: Select,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
    layout: 'centered',
  },
});

export const Preview = meta.story({
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
});

export const WithError = meta.story({
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
});

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

export const WithOptgroup = meta.story({
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
});

type SelectedCounty = County | '';

export const Controlled = meta.story({
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
      if (!cities[newCounty].some((c) => c.toLowerCase() === selectedCity)) {
        setSelectedCity('');
      }
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newCity = e.target.value;
      setSelectedCity(newCity);
      const newCounty = (Object.keys(cities) as County[]).find((f) =>
        cities[f].some((c) => c.toLowerCase() === newCity),
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
            {counties.map((f) => (
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
              ? cities[selectedCounty].map((city) => (
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
});

export const Disabled = meta.story({
  args: {
    disabled: true,
  },
  render: Preview.input.render,
});

export const ReadOnly = meta.story({
  args: {
    readOnly: true,
  },
  render: Preview.input.render,
});

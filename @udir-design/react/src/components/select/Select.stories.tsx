import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Select } from './Select';
import { Label } from '../typography/label/Label';
import { Field } from '../field/Field';
import { ValidationMessage } from '../alpha';

const meta: Meta<typeof Select> = {
  component: Select,
  tags: ['alpha'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Preview: Story = {
  args: {
    'aria-invalid': false,
    width: 'full',
    disabled: false,
    readOnly: false,
  },
  render: (args, context) => (
    <Field>
      <Label>Velg et fjell</Label>
      <Select {...args} defaultValue="" id={context.id}>
        <Select.Option value="">Velg et fjell &hellip;</Select.Option>
        <Select.Option value="everest">Mount Everest</Select.Option>
        <Select.Option value="aconcagua">Aconcagua</Select.Option>
        <Select.Option value="denali">Denali</Select.Option>
        <Select.Option value="kilimanjaro">Kilimanjaro</Select.Option>
        <Select.Option value="elbrus">Elbrus</Select.Option>
        <Select.Option value="vinson">Mount Vinson</Select.Option>
        <Select.Option value="puncakjaya">Puncak Jaya</Select.Option>
        <Select.Option value="kosciuszko">Mount Kosciuszko</Select.Option>
      </Select>
    </Field>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    await step('The label "Velg et fjell" is rendered', async () => {
      const label = canvas.getByLabelText(/velg et fjell/i);
      expect(label).toBeInTheDocument();
    });

    await step(
      'The select element is rendered with the default value',
      async () => {
        expect(select).toBeInTheDocument();
        expect(select).toHaveValue('');
      }
    );

    await step('The select contains all expected options', async () => {
      const placeholderOption = canvas.getByRole('option', {
        name: /velg et fjell/i,
      });
      expect(placeholderOption).toBeInTheDocument();
      const everestOption = canvas.getByRole('option', {
        name: /mount everest/i,
      });
      expect(everestOption).toBeInTheDocument();
    });

    await step(
      'User can select an option from the select element',
      async () => {
        await userEvent.selectOptions(select, 'everest');
        expect(select).toHaveValue('everest');
      }
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args, context) => (
    <Field>
      <Label>Velg et fjell</Label>
      <Select {...args} id={context.id}>
        <Select.Option value="blank">Velg &hellip;</Select.Option>
        <Select.Option value="everest">Mount Everest</Select.Option>
        <Select.Option value="aconcagua">Aconcagua</Select.Option>
        <Select.Option value="denali">Denali</Select.Option>
        <Select.Option value="kilimanjaro">Kilimanjaro</Select.Option>
        <Select.Option value="elbrus">Elbrus</Select.Option>
        <Select.Option value="vinson">Mount Vinson</Select.Option>
        <Select.Option value="puncakjaya">Puncak Jaya</Select.Option>
        <Select.Option value="kosciuszko">Mount Kosciuszko</Select.Option>
      </Select>
    </Field>
  ),
};

export const WithError: Story = {
  args: {
    'aria-invalid': true,
  },
  render: (args, context) => (
    <Field>
      <Label>Velg et fjell</Label>
      <Select {...args} id={context.id}>
        <Select.Option value="blank">Velg &hellip;</Select.Option>
        <Select.Option value="everest">Mount Everest</Select.Option>
        <Select.Option value="aconcagua">Aconcagua</Select.Option>
        <Select.Option value="denali">Denali</Select.Option>
        <Select.Option value="kilimanjaro">Kilimanjaro</Select.Option>
        <Select.Option value="elbrus">Elbrus</Select.Option>
        <Select.Option value="vinson">Mount Vinson</Select.Option>
        <Select.Option value="puncakjaya">Puncak Jaya</Select.Option>
        <Select.Option value="kosciuszko">Mount Kosciuszko</Select.Option>
      </Select>
      <ValidationMessage>Velg et fjell</ValidationMessage>
    </Field>
  ),
};

export const WithOptgroup: Story = {
  render: (args, context) => (
    <Field>
      <Label>Velg et fjell</Label>
      <Select {...args} id={context.id}>
        <Select.Optgroup label="Gruppe 1">
          <Select.Option value="everest">Mount Everest</Select.Option>
          <Select.Option value="aconcagua">Aconcagua</Select.Option>
          <Select.Option value="denali">Denali</Select.Option>
          <Select.Option value="kilimanjaro">Kilimanjaro</Select.Option>
        </Select.Optgroup>
        <Select.Optgroup label="Gruppe 2">
          <Select.Option value="elbrus">Elbrus</Select.Option>
          <Select.Option value="vinson">Mount Vinson</Select.Option>
          <Select.Option value="puncakjaya">Puncak Jaya</Select.Option>
          <Select.Option value="kosciuszko">Mount Kosciuszko</Select.Option>
        </Select.Optgroup>
      </Select>
    </Field>
  ),
};

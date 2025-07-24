import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect, waitFor } from 'storybook/test';
import { Chip } from './Chip';
import { Search } from '../beta';
import { useState } from 'react';
import { Paragraph } from '../alpha';

const meta: Meta<typeof Chip.Radio> = {
  component: Chip.Radio,
  tags: ['beta'],
  parameters: {
    customStyles: {
      display: 'flex',
      gap: 'var(--ds-size-2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip.Radio>;

export const Preview: Story = {
  render: (args) => (
    <>
      <Chip.Radio {...args} name="my-radio" value="nynorsk" defaultChecked>
        Nynorsk
      </Chip.Radio>
      <Chip.Radio {...args} name="my-radio" value="bokmål">
        Bokmål
      </Chip.Radio>
      <Chip.Radio {...args} name="my-radio" value="engelsk">
        Engelsk
      </Chip.Radio>
    </>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const inputNynorsk = canvas.getByRole('radio', { name: 'Nynorsk' });
    const inputBokmal = canvas.getByRole('radio', { name: 'Bokmål' });

    await step('Render label and input as native element', async () => {
      const label = canvas.getByLabelText('Nynorsk');
      expect(label).toBeInTheDocument();
      expect(inputNynorsk).toBeInTheDocument();
    });

    await step('Select Nynorsk', async () => {
      inputNynorsk.click();
      expect(inputNynorsk).toBeChecked();
      expect(inputBokmal).not.toBeChecked();
    });

    await step('Select Bokmal', async () => {
      inputBokmal.click();
      expect(inputNynorsk).not.toBeChecked();
      expect(inputBokmal).toBeChecked();
    });
  },
};

export const Checkbox: StoryObj<typeof Chip.Checkbox> = {
  render: () => {
    const options = ['2020', '2021', '2022', '2023', '2024', '2025'];

    return (
      <>
        {options.map((year) => (
          <Chip.Checkbox aria-label={year}>{year}</Chip.Checkbox>
        ))}
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('checkbox');

    await step('Render label and input as native element', async () => {
      const label = canvas.getByLabelText('2021');
      expect(label).toBeInTheDocument();
      expect(inputs[0]).toBeInTheDocument();
    });

    await step('Toggle checkbox', async () => {
      inputs[0].click();
      expect(inputs[0]).toBeChecked();
      inputs[0].click();
      expect(inputs[0]).not.toBeChecked();
    });
  },
};

export const Removable: StoryObj<typeof Chip.Removable> = {
  render: () => {
    const schoolOptions = ['Barnehage', 'Grunnskole', 'Videregående'];
    const [filter, setFilter] = useState(schoolOptions);

    return (
      <>
        {filter.map((item) => (
          <Chip.Removable
            aria-label={`Slett ${item}`}
            onClick={() => {
              setFilter((x) =>
                x.length === 1 ? schoolOptions : x.filter((y) => y !== item),
              );
            }}
          >
            {item}
          </Chip.Removable>
        ))}
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await step('Render label and button as native element', async () => {
      const label = canvas.getByText('Barnehage');
      expect(label).toBeInTheDocument();
      expect(buttons[0]).toBeInTheDocument();
    });

    await step('Remove chip', async () => {
      buttons[0].click();

      await waitFor(() => {
        const newButtons = canvas.getAllByRole('button');
        expect(newButtons).toHaveLength(buttons.length - 1);
      });
    });
  },
};

export const Button: StoryObj<typeof Chip.Button> = {
  render: () => {
    const [inputValue, setInputValue] = useState('');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-4)',
        }}
      >
        <Search>
          <Search.Input
            aria-label="søk"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Search.Clear />
          <Search.Button type="submit" />
        </Search>
        <div style={{ display: 'flex', gap: 'var(--ds-size-2)' }}>
          <Paragraph>Hurtigsøk: </Paragraph>
          <Chip.Button onClick={() => setInputValue('Læreplaner')}>
            Læreplaner
          </Chip.Button>
          <Chip.Button onClick={() => setInputValue('Skole')}>
            Skole
          </Chip.Button>
          <Chip.Button onClick={() => setInputValue('Engelsk')}>
            Eksamen
          </Chip.Button>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await step('Render label and button as native element', async () => {
      const label = canvas.getByText('Skole');
      expect(label).toBeInTheDocument();
      expect(buttons).toHaveLength(4);
    });

    await step('Click button', async () => {
      const skoleButton = canvas.getByText('Skole');
      skoleButton.click();

      await waitFor(() => {
        const input = canvas.getByLabelText('søk') as HTMLInputElement;
        expect(input.value).toBe('Skole');
      });
    });
  },
};

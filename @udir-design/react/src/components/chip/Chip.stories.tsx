import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { expect, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Search } from '../search/Search';
import { Paragraph } from '../typography/paragraph/Paragraph';
import type {
  ChipButtonProps,
  ChipCheckboxProps,
  ChipRadioProps,
  ChipRemovableProps,
} from './Chip';
import { Chip } from './Chip';
import { ChipButton } from './docs/FakeChipButton';
import { ChipCheckbox } from './docs/FakeChipCheckbox';
import { ChipRadio } from './docs/FakeChipRadio';
import { ChipRemovable } from './docs/FakeChipRemovable';

type CombinedProps = ChipRadioProps &
  ChipButtonProps &
  ChipCheckboxProps &
  ChipRemovableProps;

// Hack to get the first tab in Controls to have the correct name Chip.Button instead of ChipButton
if (Object.hasOwn(ChipButton, '__docgenInfo')) {
  (
    ChipButton as unknown as {
      __docgenInfo: { displayName: string };
    }
  ).__docgenInfo.displayName = 'Chip.Button';
}

const meta = preview.meta({
  // "as ..." here is a hack to ensure args has an acceptable type for all stories
  // It does not affect the content of the prop table
  component: ChipButton as FunctionComponent<CombinedProps>,
  subcomponents: {
    'Chip.Checkbox': ChipCheckbox,
    'Chip.Radio': ChipRadio,
    'Chip.Removable': ChipRemovable,
  },

  tags: ['digdir'],
  parameters: {
    componentOrigin: {
      name: 'Chip',
      originator: 'digdir',
    },
    customStyles: {
      display: 'flex',
      gap: 'var(--ds-size-2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});

export const Preview = meta.story({
  render: (args) => (
    <>
      <Chip.Button
        data-color={args['data-color']}
        data-size={args['data-size']}
        name="my-button"
        value="button"
      >
        Button
      </Chip.Button>
      <Chip.Checkbox {...args} name="my-checkbox" value="checkbox">
        Checkbox
      </Chip.Checkbox>
      <Chip.Radio {...args} name="my-radio" value="radio">
        Radio
      </Chip.Radio>
      <Chip.Removable
        data-color={args['data-color']}
        data-size={args['data-size']}
        name="my-removable"
        value="removable"
      >
        Removable
      </Chip.Removable>
    </>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const inputButton = canvas.getByRole('button', { name: 'Button' });
    const inputCheckbox = canvas.getByRole('checkbox', { name: 'Checkbox' });
    const inputRadio = canvas.getByRole('radio', { name: 'Radio' });

    await step('Render all labels and input as native element', async () => {
      expect(inputButton).toBeInTheDocument();
      expect(inputCheckbox).toBeInTheDocument();
      expect(inputRadio).toBeInTheDocument();
    });

    await step('Render labels', async () => {
      const label = canvas.getByLabelText('Radio');
      expect(label).toBeInTheDocument();
    });

    await step('Select Checkbox', async () => {
      inputCheckbox.click();
      expect(inputCheckbox).toBeChecked();
      expect(inputRadio).not.toBeChecked();
    });
  },
});

export const Checkbox = meta.story({
  render: (args) => {
    const options = ['2020', '2021', '2022', '2023', '2024', '2025'];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-4)',
        }}
      >
        <Paragraph>Vis data for</Paragraph>
        <div style={{ display: 'flex', gap: 'var(--ds-size-1)' }}>
          {options.map((year) => (
            <Chip.Checkbox aria-label={year} {...args}>
              {year}
            </Chip.Checkbox>
          ))}
        </div>
      </div>
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
});

export const Radio = meta.story({
  render: (args) => {
    const options = ['Barnehage', 'Grunnskole', 'Videregående'];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-4)',
        }}
      >
        <Paragraph>Vis data for</Paragraph>
        <div style={{ display: 'flex', gap: 'var(--ds-size-1)' }}>
          {options.map((grade) => (
            <Chip.Radio name="my-radio" aria-label={grade} {...args}>
              {grade}
            </Chip.Radio>
          ))}
        </div>
      </div>
    );
  },
});

export const Removable = meta.story({
  render: (args) => {
    const schoolOptions = ['Barnehage', 'Grunnskole', 'Videregående'];
    const [filter, setFilter] = useState(schoolOptions);

    return (
      <>
        {filter.map((item) => (
          <Chip.Removable
            {...args}
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
});

export const Button = meta.story({
  render: (args) => {
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
          <Chip.Button onClick={() => setInputValue('Læreplaner')} {...args}>
            Læreplaner
          </Chip.Button>
          <Chip.Button onClick={() => setInputValue('Skole')} {...args}>
            Skole
          </Chip.Button>
          <Chip.Button onClick={() => setInputValue('Engelsk')} {...args}>
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
});

export const Colors = meta.story({
  render: (args) => (
    <>
      <Chip.Button {...args}>Chip 1</Chip.Button>
      <Chip.Button data-color="accent" {...args}>
        Chip 2
      </Chip.Button>
      <Chip.Button data-color="support1" {...args}>
        Chip 3
      </Chip.Button>
      <Chip.Button data-color="support2" {...args}>
        Chip 4
      </Chip.Button>
    </>
  ),
});
